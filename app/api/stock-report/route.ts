import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get("staff_session");
  const secret = process.env.STAFF_SESSION_SECRET;
  if (!session || !secret || session.value !== secret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as Record<string, { qty: string }>;
  const entries = Object.entries(body);

  if (entries.length === 0) {
    return Response.json({ error: "No items selected" }, { status: 400 });
  }

  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;
  if (!telegramToken || !telegramChatId) {
    return Response.json({ error: "Telegram not configured" }, { status: 500 });
  }

  const date = new Date().toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const lines = entries.map(([name, { qty }]) => {
    const trimmed = qty.trim();
    if (!trimmed || trimmed === "0") return `• ${name} — <b>need to buy</b>`;
    return `• ${name} — ${trimmed}`;
  });

  const msg =
    `📦 <b>Stock Report — ${date}</b>\n\n` +
    `Items to purchase for tomorrow:\n\n` +
    lines.join("\n") +
    `\n\n<i>${entries.length} item${entries.length > 1 ? "s" : ""} flagged</i>`;

  const res = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: telegramChatId, text: msg, parse_mode: "HTML" }),
    }
  );

  if (!res.ok) {
    return Response.json({ error: "Failed to send Telegram message" }, { status: 500 });
  }

  return Response.json({ ok: true });
}
