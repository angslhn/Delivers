"use client";

import { createContext } from "react";

import type { UserPayload } from "@/types/global";

export const AuthContext = createContext<UserPayload | null>(null);
