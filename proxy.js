import { NextResponse } from "next/server";

export function proxy(request) {
  const path = request.nextUrl.pathname;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const hasSession = !!accessToken || !!refreshToken;

  const AUTH_PAGES = ["/login", "/register", "/verify-otp"];
  const isAuthPage = AUTH_PAGES.some((p) => path.startsWith(p));
  const isDashboard = path.startsWith("/dashboard");

  // Always allow verify-email
  if (path.startsWith("/verify-email")) {
    return NextResponse.next();
  }

  // ❌ Only block auth pages if ACCESS token exists
  if (accessToken && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ❌ Block dashboard ONLY if no session at all
  if (!hasSession && isDashboard) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/verify-otp",
    "/verify-email/:path*",
    "/dashboard/:path*",
  ],
};
