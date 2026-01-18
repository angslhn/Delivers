import { useEffect, useState } from "react";

type Viewport = [number, number];

export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>([0, 0]);

  useEffect(() => {
    function handleResize(): void {
      setViewport([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return viewport;
}
