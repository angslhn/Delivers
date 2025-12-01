"use client";

import AlertProvider from "@/providers/AlertProvider";

import type { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

export default function Provider({ children }: ProviderProps) {
  return <AlertProvider>{children}</AlertProvider>;
}
