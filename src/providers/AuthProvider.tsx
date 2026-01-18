"use client";

import type { ReactNode } from "react";

import { AuthContext } from "@/contexts/AuthContext";

import type { UserPayload } from "@/types/global";

type AuthProviderProps = {
  children: ReactNode;
  token: UserPayload | null;
};

export default function AuthProvider({ children, token }: AuthProviderProps) {
  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
}
