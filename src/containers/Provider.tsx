"use client";

import AlertProvider from "@/providers/AlertProvider";
import AuthProvider from "@/providers/AuthProvider";
import { UserPayload } from "@/types/global";

import type { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
  token: UserPayload | null;
};

export default function Provider({ children, token }: ProviderProps) {
  return (
    <AuthProvider token={token}>
      <AlertProvider>{children}</AlertProvider>
    </AuthProvider>
  );
}
