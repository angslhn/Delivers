"use client";

import { createContext } from "react";

import type { Dispatch, SetStateAction } from "react";
import type { Alert } from "@/types/global";

export const defaultAlert: AlertContext = {
  alertCode: 0,
  alertShow: false,
  alertTitle: null,
  alertDescription: null,
  alertConfirm: undefined,
  alertCancel: undefined,
  setAlert: () => {},
};

export interface AlertContext extends Alert {
  setAlert: Dispatch<SetStateAction<Alert>>;
}

export const AlertContext = createContext<AlertContext>(defaultAlert);
