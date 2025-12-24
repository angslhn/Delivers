"use client";

import type { JSX, ReactNode } from "react";

import Provider from "@/containers/Provider";
import ComingSoon from "@/errors/ComingSoon";
import { useViewport } from "@/hooks/Viewport";

import type { UserPayload } from "@/types/global";

type PageProps = {
  children: ReactNode;
  token: UserPayload | null;
};

export default function Page({ children, token }: PageProps): JSX.Element {
  const [width] = useViewport();

  const isMobile = width <= 450 && width >= 300;

  if (!isMobile) {
    return <ComingSoon />;
  }

  return <Provider token={token}>{children}</Provider>;
}
