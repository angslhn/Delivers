"use client";

import { createContext } from "react";

import type { Dispatch, SetStateAction } from "react";
import type { Alert } from "@/types/global";

interface AlertContext extends Alert {
  setAlert: Dispatch<SetStateAction<Alert>>;
}

export const defaultValue: AlertContext = {
  alertCode: 0,
  alertShow: false,
  alertTitle: null,
  alertDescription: null,
  alertConfirm: undefined,
  alertContinue: undefined,
  alertCancel: undefined,
  setAlert: () => {},
};

export const AlertContext = createContext<AlertContext>(defaultValue);
