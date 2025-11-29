"use client";

import { defaultValue } from "@/context/AlertContext";
import useAlert from "@/hooks/useAlert";

import type { JSX } from "react";

export default function Alert(): JSX.Element {
  const { alertCode, alertShow, alertTitle, alertDescription, alertCancel, alertConfirm, alertContinue, setAlert } = useAlert();

  const successCodes = [200, 201, 204];
  const warningCodes = [400, 401, 403, 404, 409, 422, 429];
  const errorCodes = [500, 502, 503, 504];

  const type = ((alertCode: number) => {
    if (successCodes.includes(alertCode)) return "success";
    if (warningCodes.includes(alertCode)) return "warning";
    return "error";
  })(alertCode);

  function handleClose() {
    setAlert(defaultValue);
  }

  const icon = {
    success: (
      <svg className="w-8 z-10" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g className="fill-steel-night" transform="translate(42.666667, 42.666667)">
            <path d="M213.333333,3.55271368e-14 C95.51296,3.55271368e-14 3.55271368e-14,95.51296 3.55271368e-14,213.333333 C3.55271368e-14,331.153707 95.51296,426.666667 213.333333,426.666667 C331.153707,426.666667 426.666667,331.153707 426.666667,213.333333 C426.666667,95.51296 331.153707,3.55271368e-14 213.333333,3.55271368e-14 Z M293.669333,137.114453 L323.835947,167.281067 L192,299.66912 L112.916693,220.585813 L143.083307,190.4192 L192,239.335893 L293.669333,137.114453 Z"></path>
          </g>
        </g>
      </svg>
    ),
    warning: <></>,
    error: <></>,
  };

  return (
    <div className={`${alertShow ? "row-center" : "hidden"} fixed z-10 h-screen w-full bg-steel-night/10`}>
      <div className="relative h-36 w-64 column-center gap-1 px-3 bg-cloud-white rounded-md shadow shadow-steel-night/5">
        <svg
          role="button"
          onClick={handleClose}
          className="absolute top-1.5 right-1.5 fill-steel-night w-5 hover:fill-steel-night/60"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.00386 9.41816C7.61333 9.02763 7.61334 8.39447 8.00386 8.00395C8.39438 7.61342 9.02755 7.61342 9.41807 8.00395L12.0057 10.5916L14.5907 8.00657C14.9813 7.61605 15.6144 7.61605 16.0049 8.00657C16.3955 8.3971 16.3955 9.03026 16.0049 9.42079L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.0039C15.6133 16.3945 14.9802 16.3945 14.5896 16.0039L12.0057 13.42L9.42097 16.0048C9.03045 16.3953 8.39728 16.3953 8.00676 16.0048C7.61624 15.6142 7.61624 14.9811 8.00676 14.5905L10.5915 12.0058L8.00386 9.41816Z" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
          />
        </svg>
        {icon[type]}
        <span className="font-semibold text-steel-night text-sm">{alertTitle}</span>
        <span className="w-full text-center text-[0.8rem] text-steel-night">{alertDescription}</span>
      </div>
    </div>
  );
}
