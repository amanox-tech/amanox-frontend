import { NextResponse } from "next/server";

export function proxy(request) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const path = request.nextUrl.pathname;

  const authPages = ["/login", "/register", "/verify-otp"];
  const isAuthPage = authPages.some(
    (p) => path === p || path.startsWith(`${p}/`),
  );

  const isDashboard = path.startsWith("/dashboard");
  const isAuthenticated = !!accessToken || !!refreshToken;

  // Logged in → block login/register/verify pages
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
    "/verify-email/:path*", // <— ADDED
    "/dashboard/:path*",
  ],
};
