import { NextResponse } from "next/server";

export default function proxy(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const protectedRoutes = ["/dashboard", "/profile"];

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/login"],
};