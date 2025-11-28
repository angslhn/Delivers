import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";

export default function useAlert() {
  const context = useContext(AlertContext);

  if (context === undefined) {
    throw new Error("useAlert must be used within a AlertProvider");
  }

  return context;
}
