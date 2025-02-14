import { NextResponse, type NextRequest } from "next/server";
import { currentUrl } from "./utils/routes";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  if (token && req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const needUserUrls: Record<string, string> = {
    wallet: "",
    profile: "",
    report: "location",
  };

  const url = req.nextUrl.pathname;

  // for (const [k, v] of Object.entries(needUserUrls)) {
  //   if (url.startsWith(`/${k}`) && (req.nextUrl.search.includes(v) || v === "") && !token) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login/:path*",
    "/report/:path*",
    "/profile/:path*",
    "/wallet/:path*",
  ],
};
