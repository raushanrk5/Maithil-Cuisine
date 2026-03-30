import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  const base = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 0,
  };
  // Clear cookie for both current and old path (in case of stale cookies)
  response.cookies.set("staff_session", "", { ...base, path: "/" });
  response.cookies.set("staff_session", "", { ...base, path: "/staff" });
  return response;
}
