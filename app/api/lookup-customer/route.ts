import { supabase } from "../../lib/supabase";

// In-memory rate limiter: max 10 lookups per IP per minute
const lookups = new Map<string, { count: number; resetAt: number }>();
const MAX = 10;
const WINDOW_MS = 60 * 1000;

function getIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  );
}

export async function GET(request: Request) {
  const ip = getIp(request);
  const now = Date.now();

  const record = lookups.get(ip);
  if (record) {
    if (now >= record.resetAt) {
      lookups.delete(ip);
    } else if (record.count >= MAX) {
      return Response.json({ customer: null }, { status: 429 });
    } else {
      lookups.set(ip, { count: record.count + 1, resetAt: record.resetAt });
    }
  } else {
    lookups.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  }

  const { searchParams } = new URL(request.url);
  const phone = searchParams.get("phone");

  if (!phone || !/^\d{10}$/.test(phone)) {
    return Response.json({ customer: null });
  }

  const { data } = await supabase
    .from("customers")
    .select("name, address")
    .eq("phone", phone)
    .single();

  return Response.json({ customer: data ?? null });
}
