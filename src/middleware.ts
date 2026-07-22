import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const prevPath = req.cookies.get("prevPath")?.value || "/";
  const pathname = req.nextUrl.pathname;
  const search = req.nextUrl.search;

  // Redirect authenticated users away from /login
  if (token && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const protectedRoutes: Record<string, string> = {
    wallet: "",
    profile: "",
    car: "",
    report: "location",
  };

  const isProtectedRoute = Object.entries(protectedRoutes).some(
    ([route, requiredQuery]) =>
      pathname.startsWith(`/${route}`) &&
      (requiredQuery === "" || search.includes(requiredQuery))
  );

  // Handle protected routes
  if (isProtectedRoute) {
    if (!token) {
      // No token? Redirect to login
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const decoded = jwt.decode(token) as { exp?: number; iat?: number };

      if (
        (decoded?.exp && decoded.exp * 1000 < Date.now()) ||
        (decoded?.exp ?? 0) - (decoded?.iat ?? 0) == 60 * 60 * 1000 * 24 * 7
      ) {
        const response = NextResponse.redirect(new URL("/login", req.url));
        response.cookies.delete("auth_token");
        return response;
      }
    } catch (err) {
      console.error("Failed to decode token", err);
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("auth_token");
      return response;
    }
  }

  // If user is already logged in and tries to visit /login, redirect them
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL(prevPath, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login/:path*",
    "/report/:path*",
    "/profile/:path*",
    "/wallet/:path*",
    "/cars/:path*",
  ],
};
