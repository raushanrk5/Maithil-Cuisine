import { NextResponse } from "next/server";

const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function getIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  );
}

export async function POST(request: Request) {
  const ip = getIp(request);
  const now = Date.now();

  const record = attempts.get(ip);
  if (record) {
    if (now < record.resetAt && record.count >= MAX_ATTEMPTS) {
      return NextResponse.json(
        { error: "Too many attempts. Try again in 15 minutes." },
        { status: 429 }
      );
    }
    if (now >= record.resetAt) attempts.delete(ip);
  }

  const { password } = await request.json();

  if (!password || password !== process.env.STAFF_PASSWORD) {
    const cur = attempts.get(ip) ?? { count: 0, resetAt: now + WINDOW_MS };
    attempts.set(ip, { count: cur.count + 1, resetAt: cur.resetAt });
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  attempts.delete(ip);

  const response = NextResponse.json({ success: true });
  response.cookies.set("staff_session", process.env.STAFF_SESSION_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 8, // 8 hours (full shift)
    path: "/",
  });

  return response;
}
