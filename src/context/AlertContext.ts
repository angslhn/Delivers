"use client";

import { createContext } from "react";
import { defaultAlert } from "@/hooks/Alert";

import type { Dispatch, SetStateAction } from "react";
import type { Alert } from "@/types/global";

export interface AlertContext extends Alert {
  setAlert: Dispatch<SetStateAction<Alert>>;
}

export const AlertContext = createContext<AlertContext>(defaultAlert);
