import { NextResponse } from "next/server";

export function proxy(request) {
  console.log("MIDDLEWARE COOKIES:", request.cookies.getAll());
  const path = request.nextUrl.pathname;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isAuthenticated = !!accessToken || !!refreshToken;

  const AUTH_PAGES = ["/login", "/register", "/verify-otp"];
  const isAuthPage = AUTH_PAGES.some((p) => path.startsWith(p));
  const isDashboard = path.startsWith("/dashboard");

  // Always allow verify-email route
  if (path.startsWith("/verify-email")) {
    return NextResponse.next();
  }

  // Already logged in → block login/register/verify
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Not logged in → block dashboard
  if (!isAuthenticated && isDashboard) {
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
