import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login pages through
  if (pathname === "/ops/login") return NextResponse.next();
  if (pathname === "/staff/login") return NextResponse.next();

  // Protect all /ops routes
  if (pathname.startsWith("/ops")) {
    const session = request.cookies.get("admin_session");
    const secret = process.env.ADMIN_SESSION_SECRET;
    if (!session || !secret || session.value !== secret) {
      return NextResponse.redirect(new URL("/ops/login", request.url));
    }
  }

  // Protect all /staff routes
  if (pathname.startsWith("/staff")) {
    const session = request.cookies.get("staff_session");
    const secret = process.env.STAFF_SESSION_SECRET;
    if (!session || !secret || session.value !== secret) {
      return NextResponse.redirect(new URL("/staff/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ops/:path*", "/staff/:path*"],
};
