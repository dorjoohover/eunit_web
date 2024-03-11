import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const status = cookies().get("status");

  // if (!status && !request.nextUrl.pathname.startsWith("/login")) {
  //   return Response.redirect(new URL("/about", request.url));
  // }
  console.log("middle " + status);
  if (status?.value && request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
