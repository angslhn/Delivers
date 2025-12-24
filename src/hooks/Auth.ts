"use client";

import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { UserPayload } from "@/types/global";

export function useAuth(): UserPayload | null {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth harus digunakan didalam AuthProvider");
  }

  return context;
}
