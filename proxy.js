import { NextResponse } from "next/server";

// Helper function to create redirects and disable caching
const redirectWithNoCache = (url, requestUrl) => {
  const response = NextResponse.redirect(new URL(url, requestUrl));
  // This header forces Vercel to re-execute the middleware on the next request,
  // ensuring the newly set cookies are read.
  response.headers.set("x-middleware-cache", "no-cache");
  return response;
};

export function proxy(request) {
  // Add this line to temporarily check the raw header for debugging
  console.log("RAW COOKIE HEADER:", request.headers.get("cookie"));

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
    // Use the new function for redirects
    return redirectWithNoCache("/dashboard", request.url);
  }

  // Not logged in → block dashboard
  if (!isAuthenticated && isDashboard) {
    // Use the new function for redirects
    return redirectWithNoCache("/login", request.url);
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
