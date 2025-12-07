import { NextResponse } from "next/server";

export function proxy(request) {
  console.log("MIDDLEWARE COOKIES:", request.cookies.getAll());
  console.log("RAW COOKIE HEADER:", request.headers.get("cookie"));
  const path = request.nextUrl.pathname;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isAuthenticated = !!accessToken || !!refreshToken;

  const AUTH_PAGES = ["/login", "/register", "/verify-otp"];
  const isAuthPage = AUTH_PAGES.some((p) => path.startsWith(p));
  const isDashboard = path.startsWith("/dashboard");

  // Function to handle redirects with no-cache header
  const redirectWithNoCache = (url, requestUrl) => {
    const response = NextResponse.redirect(new URL(url, requestUrl));
    // Force Vercel/Next.js to run the middleware on every request
    response.headers.set("x-middleware-cache", "no-cache");
    return response;
  };

  // Always allow verify-email route
  if (path.startsWith("/verify-email")) {
    return NextResponse.next();
  }

  // Already logged in → block login/register/verify
  if (isAuthenticated && isAuthPage) {
    return redirectWithNoCache("/dashboard", request.url); // Use the new function
  }

  // Not logged in → block dashboard
  if (!isAuthenticated && isDashboard) {
    return redirectWithNoCache("/login", request.url); // Use the new function
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
