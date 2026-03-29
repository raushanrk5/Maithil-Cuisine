import { supabase } from "../../lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const phone = searchParams.get("phone");

  if (!phone || phone.length < 10) {
    return Response.json({ customer: null });
  }

  const { data } = await supabase
    .from("customers")
    .select("name, address")
    .eq("phone", phone)
    .single();

  return Response.json({ customer: data ?? null });
}
