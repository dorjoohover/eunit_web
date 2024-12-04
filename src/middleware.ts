import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { UserType } from "./config/enum";
import { getToken } from "next-auth/jwt";
import redis from "./lib/redis";
import { getUser } from "./(api)/user.api";
import { logOut } from "./(api)/auth.api";
export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;
  if (!token) return;
  //  return Response.redirect(new URL("/login", req.url));

  const userData = await getUser();
  // const userData = null
  if (userData == null && token != undefined) {
    // const log = await logOut();
  }
  // console.log(userData)
  // if (userData) {
  //   req.user = JSON.parse(userData as string);
  //   return NextResponse.next();
  // }
  if (token && req.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/", req.url));
  }
  const url = req.nextUrl.pathname;

  const needUser = url.startsWith("/wallet") || url.startsWith("/profile");
  if (!token && needUser && !userData) {
    return Response.redirect(new URL("/login", req.url));
  }

  const needAdmin = req.nextUrl.pathname.startsWith("/admin");
  if (needAdmin && token) {
    const admin = false;
    if (needAdmin && !admin) {
      return Response.redirect(new URL("/", req.url));
    } else {
      const red =
        req.nextUrl.pathname == "/admin" ||
        req.nextUrl.pathname.toLowerCase().startsWith("/admin/request");
      if (red && !url.toLocaleLowerCase().startsWith("/admin/request/"))
        return Response.redirect(new URL("/admin/request/realState", req.url));
      const users = url.toLocaleLowerCase() == "/admin/users";
      if (users)
        return Response.redirect(new URL("/admin/users/default", req.url));
    }
  }
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
