import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const path = req.nextUrl.pathname.endsWith("/")
    ? req.nextUrl.pathname.slice(0, -1)
    : req.nextUrl.pathname;

  const isAuthPage = path === "/login";
  const isProtectedPage = path.startsWith("/dashboard");

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isProtectedPage && (!token || token.trim() === "")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};
