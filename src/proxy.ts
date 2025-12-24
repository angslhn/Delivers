import env from "@/config/env";
import { NextRequest, NextResponse } from "next/server";
import { authPath, authTokenPath, protectedPath } from "@/resources/path";

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const { cookieName } = env();

  const cookie = request.cookies.get(cookieName as string)?.value;

  const token = searchParams.get("token")?.match(/^[a-zA-Z0-9]{64}$/);

  const isAuthPage = authPath.some((path) => pathname.startsWith(path));
  const isAuthTokenPage = authTokenPath.some((path) => pathname.startsWith(path));
  const isProtectedPage = protectedPath.some((path) => pathname.startsWith(path));

  if (cookie && isAuthPage) {
    const homeUrl = new URL("/", request.url);

    return NextResponse.redirect(homeUrl);
  }

  if (isAuthTokenPage && !token) {
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
