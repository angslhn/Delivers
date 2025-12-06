import { useState } from "react";

import { AlertContext } from "@/context/AlertContext";
import { defaultAlert } from "@/hooks/Alert";

import type { Alert } from "@/types/global";
import type { JSX, ReactNode } from "react";

export default function AlertProvider({ children }: { children: ReactNode }): JSX.Element {
  const [alert, setAlert] = useState<Alert>(defaultAlert);

  return <AlertContext.Provider value={{ ...alert, setAlert }}>{children}</AlertContext.Provider>;
}
