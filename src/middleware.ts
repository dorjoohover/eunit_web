import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { UserType } from "./config/enum";
import { getUser } from "./app/(api)/user.api";

export function middleware(request: NextRequest) {
  const current = cookies().get("current");

  if (current?.value && request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/", request.url));
  }
  const url = request.nextUrl.pathname;

  const needUser =
    url.startsWith("/ad/create") ||
    url.startsWith("/ad/sharing") ||
    url.startsWith("/estimator") ||
    url.startsWith("/account");
  if (!current?.value && needUser) {
    return Response.redirect(new URL("/login", request.url));
  }

  const needAdmin = request.nextUrl.pathname.startsWith("/admin");
  if (needAdmin && current?.value) {
    const type = cookies().get("type");

    const admin =
      type?.value == UserType.admin || type?.value == UserType.system;
    if (needAdmin && !admin) {
      return Response.redirect(new URL("/", request.url));
    } else {
      const red =
        request.nextUrl.pathname == "/admin" ||
        request.nextUrl.pathname.toLowerCase().startsWith("/admin/request");
      if (red && !url.toLocaleLowerCase().startsWith('/admin/request/'))
        return Response.redirect(
          new URL("/admin/request/realState", request.url)
        );
      const users = url.toLocaleLowerCase() == '/admin/users'
      if(users) return Response.redirect(new URL('/admin/users/default', request.url))
    }
  }
}

export const config = {
  matcher: [
    "/",
    "/login/:path*",
    "/ad/:path*",
    "/account/:path*",
    "/admin/:path*",
    "/estimator",
  ],
};
