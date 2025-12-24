"use client";

import { useContext } from "react";
import { AlertContext } from "@/contexts/AlertContext";

export function useAlert(): AlertContext {
  const context = useContext(AlertContext);

  if (context === undefined) {
    throw new Error("useAlert harus digunakan didalam AlertProvider");
  }

  return context;
}
