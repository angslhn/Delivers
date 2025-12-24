"use client";

import { useAlert } from "@/hooks/Alert";
import { defaultAlert } from "@/contexts/AlertContext";

import type { JSX } from "react";

export default function Alert(): JSX.Element {
  const { alertCode, alertShow, alertTitle, alertDescription, alertCancel, alertConfirm, setAlert } = useAlert();

  const successCodes = [200, 201, 204];
  const warningCodes = [400, 401, 403, 404, 409, 422, 429];

  const type = ((alertCode: number) => {
    if (successCodes.includes(alertCode)) return "success";
    if (warningCodes.includes(alertCode)) return "warning";

    return "error";
  })(alertCode);

  function handleClose() {
    setAlert(defaultAlert);
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
    warning: (
      <svg className="w-8 z-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 2.2a10.3 10.3 0 1 0 10.3 10.3A10.299 10.299 0 0 0 12.5 2.2zM12 7h1v7h-1zm.5 10.5a1 1 0 1 1 1-1 1.002 1.002 0 0 1-1 1z" />
        <path fill="none" d="M0 0h24v24H0z" />
      </svg>
    ),
    error: (
      <svg className="w-8 z-10" viewBox="0 0 32 32">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-570.000000, -1089.000000)" fill="#000000">
            <path d="M591.657,1109.24 C592.048,1109.63 592.048,1110.27 591.657,1110.66 C591.267,1111.05 590.633,1111.05 590.242,1110.66 L586.006,1106.42 L581.74,1110.69 C581.346,1111.08 580.708,1111.08 580.314,1110.69 C579.921,1110.29 579.921,1109.65 580.314,1109.26 L584.58,1104.99 L580.344,1100.76 C579.953,1100.37 579.953,1099.73 580.344,1099.34 C580.733,1098.95 581.367,1098.95 581.758,1099.34 L585.994,1103.58 L590.292,1099.28 C590.686,1098.89 591.323,1098.89 591.717,1099.28 C592.11,1099.68 592.11,1100.31 591.717,1100.71 L587.42,1105.01 L591.657,1109.24 L591.657,1109.24 Z M586,1089 C577.163,1089 570,1096.16 570,1105 C570,1113.84 577.163,1121 586,1121 C594.837,1121 602,1113.84 602,1105 C602,1096.16 594.837,1089 586,1089 L586,1089 Z"></path>
          </g>
        </g>
      </svg>
    ),
  };

  return (
    <div className={`${alertShow ? "row-center" : "hidden"} fixed z-10 h-screen w-full bg-steel-night/10`}>
      <div className="relative px-2.5 py-3 w-64 column-center gap-1 bg-cloud-white rounded-md shadow shadow-steel-night/5">
        {type !== "success" && (
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
        )}
        {icon[type]}
        <span className="font-semibold text-steel-night text-sm">{alertTitle}</span>
        <span className="w-full text-center text-[0.8rem] text-steel-night">{alertDescription}</span>
        <div className="row-center gap-2">
          <button onClick={alertConfirm} className="w-24 h-8 bg-steel-night text-cloud-white rounded-md text-sm">
            Konfirmasi
          </button>
          {alertCancel && (
            <button onClick={alertCancel} className="w-24 h-8 bg-steel-night text-cloud-white rounded-md text-sm">
              Batal
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
