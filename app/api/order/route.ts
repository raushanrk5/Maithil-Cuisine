import { supabase } from "../../lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type OrderItem = {
  name: string;
  price: number;
  quantity: number;
};

export async function POST(request: Request) {
  try {
    const { name, phone, address, items, total } = await request.json();

    if (!name || !phone || !address || !items?.length) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Upsert customer (save or update their details)
    await supabase.from("customers").upsert(
      { phone, name, address, updated_at: new Date().toISOString() },
      { onConflict: "phone" }
    );

    // Save order
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        customer_phone: phone,
        customer_name: name,
        customer_address: address,
        items,
        total,
      })
      .select("id")
      .single();

    if (error) throw error;

    const orderId = order.id.slice(0, 8).toUpperCase();

    // Send email notification to owner
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.OWNER_EMAIL!,
      subject: `🍽️ New Order #${orderId} — ₹${total}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1E2D5A; padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #C9A84C; margin: 0; font-size: 22px;">🍽️ New Order Received</h1>
            <p style="color: white; margin: 6px 0 0; font-size: 14px;">Order #${orderId}</p>
          </div>

          <div style="background: #FDF5E6; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #F0DFC0;">

            <h2 style="color: #1E2D5A; font-size: 16px; margin: 0 0 12px;">Customer Details</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr><td style="padding: 4px 0; color: #666; width: 100px;">Name</td><td style="font-weight: bold; color: #1E2D5A;">${name}</td></tr>
              <tr><td style="padding: 4px 0; color: #666;">Phone</td><td style="font-weight: bold; color: #1E2D5A;">${phone}</td></tr>
              <tr><td style="padding: 4px 0; color: #666;">Address</td><td style="font-weight: bold; color: #1E2D5A;">${address}</td></tr>
            </table>

            <h2 style="color: #1E2D5A; font-size: 16px; margin: 0 0 12px;">Order Items</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <thead>
                <tr style="background: #1E2D5A; color: white;">
                  <th style="padding: 8px 12px; text-align: left; border-radius: 6px 0 0 6px;">Item</th>
                  <th style="padding: 8px 12px; text-align: center;">Qty</th>
                  <th style="padding: 8px 12px; text-align: right; border-radius: 0 6px 6px 0;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${items
                  .map(
                    (item: OrderItem, i: number) => `
                  <tr style="background: ${i % 2 === 0 ? "white" : "#FDF5E6"}">
                    <td style="padding: 8px 12px; color: #1E2D5A;">${item.name}</td>
                    <td style="padding: 8px 12px; text-align: center; color: #1E2D5A;">×${item.quantity}</td>
                    <td style="padding: 8px 12px; text-align: right; color: #8B2020; font-weight: bold;">₹${item.price * item.quantity}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>

            <div style="background: #1E2D5A; color: white; padding: 14px 20px; border-radius: 8px; display: flex; justify-content: space-between;">
              <span style="font-size: 16px; font-weight: bold;">Total Amount</span>
              <span style="font-size: 20px; font-weight: bold; color: #C9A84C;">₹${total}</span>
            </div>
          </div>
        </div>
      `,
    });

    return Response.json({ success: true, orderId });
  } catch (err) {
    console.error("Order error:", err);
    return Response.json({ error: "Failed to place order" }, { status: 500 });
  }
}
