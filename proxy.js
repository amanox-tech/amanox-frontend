import { NextResponse } from "next/server";

export function proxy(request) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const path = request.nextUrl.pathname;

  const authPages = ["/login", "/register", "/verify-otp"];
  const isAuthPage = authPages.includes(path);
  const isDashboard = path.startsWith("/dashboard");

  const isAuthenticated = !!accessToken || !!refreshToken;

  // --- 1. If logged in (access or refresh token), block login/register/verify pages ---
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // --- 2. If NOT logged in (no tokens), block dashboard ---
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
    "/dashboard/:path*",
  ],
};
