"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import env from "@/config/env";

export default async function logout() {
  const { cookieName } = env();

  (await cookies()).delete(cookieName as string);

  redirect("/");
}
