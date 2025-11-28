import { createContext } from "react";

import type { Alert } from "@/types/global";
import type { Dispatch, SetStateAction } from "react";

type AlertContext = {
  alert: Alert | null;
  setAlert: Dispatch<SetStateAction<Alert | null>>;
};

export const AlertContext = createContext<AlertContext | undefined>(undefined);
