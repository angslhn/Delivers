"use client";

import type { JSX, ReactNode } from "react";

import Provider from "@/app/(Wrapper)/Provider";
import useViewport from "@/hooks/useViewport";

import ErrorDevelopment from "@/page/ErrorDevelopment";

export default function App({ children }: { children: ReactNode }): JSX.Element {
  const [width] = useViewport();

  const isMobile = width <= 450;

  return (
    <>
      {isMobile && <Provider>{children}</Provider>}
      {!isMobile && <ErrorDevelopment />}
    </>
  );
}
