import env from "@/config/env";
import { NextRequest, NextResponse } from "next/server";

const authPaths = ["/auth/signin", "/auth/signup"];
const protectedPaths = ["/cart", "/wishlist", "/profile", "/dashboard", "/transaction", "/payment"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { cookieName } = env();

  const token = request.cookies.get(cookieName)?.value;

  const isAuthPage = authPaths.some((path) => pathname.startsWith(path));
  const isProtectedPage = protectedPaths.some((path) => pathname.startsWith(path));

  if (token && isAuthPage) {
    const homeUrl = new URL("/", request.url);

    return NextResponse.redirect(homeUrl);
  }

  if (!token && isProtectedPage) {
    const signinUrl = new URL("/auth/signin", request.url);

    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
