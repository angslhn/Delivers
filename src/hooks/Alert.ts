"use client";

import { useContext } from "react";
import { AlertContext } from "@/context/AlertContext";

export const defaultAlert: AlertContext = {
  alertCode: 0,
  alertShow: false,
  alertTitle: null,
  alertDescription: null,
  alertConfirm: undefined,
  alertCancel: undefined,
  setAlert: () => {},
};

export function useAlert(): AlertContext {
  const context = useContext(AlertContext);

  if (context === undefined) {
    throw new Error("useAlert harus digunakan didalam AlertProvider");
  }

  return context;
}
