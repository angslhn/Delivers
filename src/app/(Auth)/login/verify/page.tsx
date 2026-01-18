"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { defaultAlert } from "@/contexts/AlertContext";
import { useAlert } from "@/hooks/Alert";

import Timer from "@/elements/Timer";
import Loading from "@/elements/Loading";
import InputOTP from "@/elements/InputOTP";

import type { JSX, FormEvent } from "react";
import type { AuthResponse, Delay } from "@/types/global";

export default function VerifyLoginPage(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<Delay>({ set: false, minute: 0 });
  const [otp, setOtp] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const { setAlert } = useAlert();

  function handleInputOtp(otp: string) {
    setOtp(otp);
  }

  async function handleVerify(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const token = searchParams.get("token");

      const response: Response = await fetch("/api/auth/verify/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, otp }),
      });

      const { message }: AuthResponse = await response.json();

      const codeResponse = response.status;

      const alertValue = {
        alertCode: response.status,
        alertShow: true,
        alertTitle: message.title,
        alertDescription: message.description,
      };

      if (response.status === 200) {
        setAlert({
          ...alertValue,
          alertConfirm: () => {
            setAlert(defaultAlert);

            router.push("/account");

            router.refresh();
          },
        });

        return;
      }

      const onPage = [400, 500];

      if (onPage.includes(codeResponse)) {
        setAlert({
          ...alertValue,
          alertConfirm: () => {
            setAlert(defaultAlert);
          },
        });

        return;
      }

      const backLogin = [403, 404, 422];

      if (backLogin.includes(codeResponse)) {
        setAlert({
          ...alertValue,
          alertConfirm: () => {
            setAlert(defaultAlert);

            router.push("/login");
          },
        });

        return;
      }
    } catch {
      setAlert({
        alertCode: 0,
        alertShow: true,
        alertTitle: "Gagal Mengirimkan Permintaan",
        alertDescription: "Terjadi kendala pada server kami. Mohon tunggu sebentar sebelum mencoba kembali.",
        alertConfirm: () => {
          setAlert(defaultAlert);

          router.push("/login");
        },
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    try {
      const response: Response = await fetch("/api/auth/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: searchParams.get("token") }),
      });

      const { message, token, delay }: AuthResponse = await response.json();

      const alertValue = {
        alertCode: response.status,
        alertShow: true,
        alertTitle: message.title,
        alertDescription: message.description,
      };

      if (response.status === 200) {
        setAlert({
          ...alertValue,
          alertConfirm: () => {
            setAlert(defaultAlert);

            router.push("/login/verify?token=" + token);

            setTimer({ set: true, minute: delay as number });
          },
        });

        return;
      }

      if (response.status === 404) {
        setAlert({
          ...alertValue,
          alertConfirm: () => {
            setAlert(defaultAlert);

            router.push("/login");
          },
        });
      }
    } catch {
      setAlert({
        alertCode: 0,
        alertShow: true,
        alertTitle: "Gagal Mengirimkan Permintaan",
        alertDescription: "Terjadi kendala pada server kami. Mohon tunggu sebentar sebelum mencoba kembali.",
        alertConfirm: () => {
          setAlert(defaultAlert);

          router.push("/login");
        },
      });
    }
  }

  useEffect(() => {
    if (!timer) return;

    const timeout = setTimeout(
      () => {
        setTimer({ set: false, minute: 0 });
      },
      timer.minute * 60 * 1000
    );

    return () => clearTimeout(timeout);
  }, [timer]);

  return (
    <main className="h-screen w-full row-center">
      <form
        onSubmit={handleVerify}
        className="xxs:w-11/12 s-plus:w-3/4 s-extra-large:w-2/3 md:w-[23rem] column-center gap-5 px-4 py-4 rounded-xl border border-black/15 shadow"
      >
        <div className="w-full column-center gap-3">
          <div className="row-center gap-2">
            <svg className="w-10 fill-steel-night" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 1000" xmlSpace="preserve">
              <path d="m26.34 115.32 546.04 123.84 1.51 521.82L26.11 887.19l2-112.84 437.38-97.89-1.11-347.65-438.04-96.48zm83.8-52.44v69.22l118.08 26.57V90.44zm119.15 779.76v66.94l-118.08 27.54 1.59-67.56z" />
              <path d="m110.14 753.84 118.08-26.21V278.49l-118.08-25.86z" />
            </svg>
            <h1 className="font-bold text-2xl text-steel-night select-none">Delivers.</h1>
          </div>
          <span className="font-normal text-center text-[0.9rem] text-steel-night select-none">
            Kami telah mengirimkan kode verifkasi melalui email yang Anda daftarkan
          </span>
        </div>
        <div className="w-full column-center">
          <label className="my-2 text-steel-night font-semibold">Kode Verifikasi</label>
          <InputOTP length={6} onComplete={handleInputOtp} />
          <div className="row-center gap-1 my-4">
            <span className="font-normal text-center text-xs text-steel-night select-none">Tidak menerima kode verifikasi?</span>
            {timer.set ? (
              <Timer show={timer.set} minute={timer.minute} />
            ) : (
              <span
                onClick={handleResend}
                className="font-semibold text-center text-xs text-steel-night select-none hover:text-steel-night/70 hover:cursor-pointer"
              >
                Kirim Ulang
              </span>
            )}
          </div>
          <button
            type="submit"
            className="h-10 my-4 w-40 row-center bg-steel-night font-semibold text-cloud-white rounded-md hover:bg-steel-night/90 hover:text-cloud-white/90 hover:cursor-pointer"
          >
            {!loading && "Verifikasi"}
            {loading && <Loading />}
          </button>
        </div>
      </form>
    </main>
  );
}
