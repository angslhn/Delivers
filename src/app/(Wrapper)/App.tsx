"use client";

import { type JSX, type ReactNode } from "react";

import Provider from "@/app/(Wrapper)/Provider";
import useViewport from "@/hooks/useViewport";

export default function App({ children }: { children: ReactNode }): JSX.Element {
  const [width] = useViewport();

  const isMobile = width <= 450;

  return (
    <>
      {isMobile && <Provider>{children}</Provider>}
      {!isMobile && (
        <div className="h-screen w-full column-center">
          <span className="text-steel-night font-semibold">Maaf! Website dalam tahap pengembangan</span>
          <span className="text-steel-night font-semibold">Kami berusaha untuk memberikan pengalaman terbaik. Silakan kembali lagi nanti!</span>
        </div>
      )}
    </>
  );
}
