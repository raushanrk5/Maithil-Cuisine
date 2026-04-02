import { cookies } from "next/headers";
import { supabase } from "../../lib/supabase";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get("staff_session");
  const secret = process.env.STAFF_SESSION_SECRET;
  if (!session || !secret || session.value !== secret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status } = await request.json();
  if (!id || !["pending", "delivered"].includes(status)) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
