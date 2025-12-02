import env from "@/config/env";
import { NextRequest, NextResponse } from "next/server";
import { authPath, protectedPath } from "@/libs/path";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const { cookieName } = env();

  const cookie = request.cookies.get(cookieName as string)?.value;

  const isAuthPage = authPath.some((path) => pathname.startsWith(path));
  const isProtectedPage = protectedPath.some((path) => pathname.startsWith(path));
  const isValidToken = searchParams.get("token")?.match(/^[a-zA-Z0-9]{64}$/);

  if (cookie && isAuthPage) {
    const homeUrl = new URL("/", request.url);

    return NextResponse.redirect(homeUrl);
  }

  if (pathname.startsWith("/verify-email") && !isValidToken) {
    const signinUrl = new URL("/login", request.url);

    return NextResponse.redirect(signinUrl);
  }

  if (!cookie && isProtectedPage) {
    const signinUrl = new URL("/login", request.url);

    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
