import env from "@/config/env";
import { cookies } from "next/headers";
import { verifyToken } from "@/helpers/auth";

import Page from "@/containers/Page";

import type { JSX, ReactNode } from "react";
import type { UserPayload } from "@/types/global";

export default async function App({ children }: { children: ReactNode }): Promise<JSX.Element> {
  const cookieStore = await cookies();

  const { cookieName } = env();

  const token = cookieStore.get(cookieName as string)?.value;

  let user: UserPayload | null = null;

  if (token) {
    user = await verifyToken(token);
  }

  return <Page token={user}>{children}</Page>;
}
