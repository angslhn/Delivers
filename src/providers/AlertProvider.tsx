import { useState } from "react";

import { AlertContext, defaultValue } from "@/context/AlertContext";

import type { Alert } from "@/types/global";
import type { JSX, ReactNode } from "react";

export default function AlertProvider({ children }: { children: ReactNode }): JSX.Element {
  const [alert, setAlert] = useState<Alert>(defaultValue);

  return <AlertContext.Provider value={{ ...alert, setAlert }}>{children}</AlertContext.Provider>;
}
