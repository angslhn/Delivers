"use client";

import type { JSX } from "react";

import { useEffect, useState } from "react";

export default function Timer({ show, minute }: { show: boolean; minute: number }): JSX.Element {
  const [view, setView] = useState<boolean>(show);
  const [timer, setTimer] = useState<Record<"minute" | "second", number>>({ minute: 0, second: 0 });

  useEffect(() => {
    if (show) {
      setView(true);
      setTimer({ minute, second: 0 });
    } else {
      setView(false);
    }
  }, []);

  useEffect(() => {
    if (!view) return;

    if (timer.minute === 0 && timer.second === 0) return;

    const resendTimer = setTimeout(() => {
      setTimer((prev) => {
        let minute = prev.minute;
        let second = prev.second;

        if (second > 0) {
          second -= 1;
        } else {
          if (minute > 0) {
            minute -= 1;
            second = 59;
          } else {
            setView(false);
            return prev;
          }
        }

        return { minute, second };
      });
    }, 1000);

    return () => clearTimeout(resendTimer);
  }, [timer]);

  if (!view) return <></>;

  return (
    <span className="text-center text-xs text-steel-night select-none">
      {timer.minute > 0 && `${timer.minute} Menit`} {`${timer.second} Detik`}
    </span>
  );
}
