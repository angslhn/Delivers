"use client";

import { useState, useRef, useEffect } from "react";

import type { ChangeEvent, KeyboardEvent, ClipboardEvent } from "react";

type InputProps = {
  length?: number;
  onComplete?: (otp: string) => void;
};

export default function InputOTP({ length = 6, onComplete }: InputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (isNaN(Number(value))) return;

    const newOtp = [...otp];

    newOtp[index] = value.substring(value.length - 1);

    setOtp(newOtp);

    const combinedOtp = newOtp.join("");

    if (combinedOtp.length === length && onComplete) {
      onComplete(combinedOtp);
    }

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.split("");
    const newOtp = [...otp];
    digits.forEach((digit, i) => (newOtp[i] = digit));
    setOtp(newOtp);

    const focusIndex = Math.min(digits.length, length - 1);
    inputRefs.current[focusIndex]?.focus();

    if (newOtp.join("").length === length && onComplete) {
      onComplete(newOtp.join(""));
    }
  };

  return (
    <div className="row-center gap-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-10 h-10 text-center text-2xl font-bold border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-gray-800 bg-white"
        />
      ))}
    </div>
  );
}
