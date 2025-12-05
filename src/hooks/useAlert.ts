"use client";

import { useContext } from "react";
import { AlertContext } from "@/context/AlertContext";

export default function useAlert(): AlertContext {
  const context = useContext(AlertContext);

  if (context === undefined) {
    throw new Error("useAlert harus digunakan didalam AlertProvider");
  }

  return context;
}
