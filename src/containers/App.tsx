"use client";

import type { JSX, ReactNode } from "react";

import Provider from "@/containers/Provider";
import useViewport from "@/hooks/useViewport";

import ComingSoon from "@/page/ComingSoon";

export default function App({ children }: { children: ReactNode }): JSX.Element {
  const [width] = useViewport();

  const isMobile = width <= 450 && width >= 300;

  return (
    <>
      {isMobile && <Provider>{children}</Provider>}
      {!isMobile && <ComingSoon />}
    </>
  );
}
