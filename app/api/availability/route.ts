import { supabase } from "../../lib/supabase";
import { cookies } from "next/headers";

export type Availability = {
  disabled_categories: string[];
  disabled_items: string[];
};

export async function GET() {
  const { data } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "availability")
    .single();

  const availability: Availability = data?.value ?? {
    disabled_categories: [],
    disabled_items: [],
  };

  return Response.json(availability);
}

export async function POST(request: Request) {
  // Only staff can update availability
  const cookieStore = await cookies();
  const session = cookieStore.get("staff_session");
  const secret = process.env.STAFF_SESSION_SECRET;

  if (!session || !secret || session.value !== secret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: Availability = await request.json();

  if (
    !Array.isArray(body.disabled_categories) ||
    !Array.isArray(body.disabled_items)
  ) {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { error } = await supabase
    .from("settings")
    .update({ value: body })
    .eq("key", "availability");

  if (error) {
    return Response.json({ error: "Failed to update" }, { status: 500 });
  }

  return Response.json({ success: true });
}
