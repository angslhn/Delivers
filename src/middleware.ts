import env from "@/config/env";
import { NextRequest, NextResponse } from "next/server";
import { authPath, protectedPath } from "@/libs/path";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const { cookieName } = env();

  const token = request.cookies.get(cookieName as string)?.value;

  const isAuthPage = authPath.some((path) => pathname.startsWith(path));
  const isProtectedPage = protectedPath.some((path) => pathname.startsWith(path));

  if (token && isAuthPage) {
    const homeUrl = new URL("/", request.url);

    return NextResponse.redirect(homeUrl);
  }

  if (!token && isProtectedPage) {
    const signinUrl = new URL("/login", request.url);

    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
