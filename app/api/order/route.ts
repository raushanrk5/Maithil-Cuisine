import { supabase } from "../../lib/supabase";
import { vegMenu, nonVegMenu } from "../../data/menu";
import { isRestaurantOpen } from "../../lib/hours";
import { headers } from "next/headers";

const orderRateLimit = new Map<string, { count: number; resetAt: number }>();

function checkOrderLimit(ip: string): boolean {
  const now = Date.now();
  const entry = orderRateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    orderRateLimit.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

// Build canonical price map — single source of truth, never trust the client
function parseMenuPrice(priceStr: string): number {
  const match = priceStr.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
}

const priceMap = new Map<string, number>();
for (const category of [...vegMenu, ...nonVegMenu]) {
  for (const item of category.items) {
    priceMap.set(item.name, parseMenuPrice(item.price));
  }
}

type RawItem = { name: string; quantity: unknown };

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    if (!checkOrderLimit(ip)) {
      return Response.json({ error: "Too many orders. Please try again later." }, { status: 429 });
    }

    const { name, phone, address, items } = await request.json();

    if (!isRestaurantOpen()) {
      return Response.json({ error: "We are currently closed. Order hours: 11:30 AM – 11:00 PM" }, { status: 400 });
    }

    if (!name || !phone || !address || !items?.length) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!/^\d{10}$/.test(phone)) {
      return Response.json({ error: "Invalid phone number" }, { status: 400 });
    }

    if (typeof name !== "string" || name.length > 100) {
      return Response.json({ error: "Invalid name" }, { status: 400 });
    }

    if (typeof address !== "string" || address.length > 500) {
      return Response.json({ error: "Invalid address" }, { status: 400 });
    }

    // Validate every item against the menu and compute total server-side
    const validatedItems: Array<{ name: string; price: number; quantity: number }> = [];
    for (const item of items as RawItem[]) {
      const price = priceMap.get(item.name);
      if (!price) {
        return Response.json({ error: `Unknown item: ${item.name}` }, { status: 400 });
      }
      const qty = Math.max(1, Math.floor(Number(item.quantity)));
      validatedItems.push({ name: item.name, price, quantity: qty });
    }
    const total = validatedItems.reduce((s, i) => s + i.price * i.quantity, 0);

    // Upsert customer
    await supabase.from("customers").upsert(
      { phone, name, address, updated_at: new Date().toISOString() },
      { onConflict: "phone" }
    );

    // Save order with server-computed total
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        customer_phone: phone,
        customer_name: name,
        customer_address: address,
        items: validatedItems,
        total,
      })
      .select("id")
      .single();

    if (error) throw error;

    const orderId = order.id.slice(0, 8).toUpperCase();

    // Send Telegram notification
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    if (telegramToken && telegramChatId) {
      const itemLines = validatedItems
        .map((i) => `• ${i.name} × ${i.quantity} — ₹${i.price * i.quantity}`)
        .join("\n");
      const telegramMsg =
        `🍽️ <b>New Order #${orderId}</b>\n\n` +
        `👤 <b>Name:</b> ${name}\n` +
        `📞 <b>Phone:</b> <a href="tel:+91${phone}">${phone}</a>\n` +
        `📍 <b>Address:</b> ${address}\n\n` +
        `<b>Items:</b>\n${itemLines}\n\n` +
        `💰 <b>Total: ₹${total}</b>`;

      fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: telegramMsg,
          parse_mode: "HTML",
        }),
      }).catch(() => {}); // non-blocking, don't fail the order if Telegram fails
    }


    return Response.json({ success: true, orderId });
  } catch (err) {
    console.error("Order error:", err);
    return Response.json({ error: "Failed to place order" }, { status: 500 });
  }
}
