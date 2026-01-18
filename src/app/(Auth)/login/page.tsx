"use client";

import Link from "next/link";

import { ZodError } from "zod";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import { useAlert } from "@/hooks/Alert";
import { defaultAlert } from "@/contexts/AlertContext";

import Input from "@/elements/Input";
import Loading from "@/elements/Loading";
import parseErrors from "@/helpers/parse-errors";
import login from "@/schemas/auth/login";

import type { FormEvent, JSX } from "react";
import type { AuthResponse } from "@/types/global";

type Field = "email" | "password";

const defaultValue = { email: "", password: "" };

export default function LoginPage(): JSX.Element {
  const [data, setData] = useState<Record<Field, string>>(defaultValue);
  const [errors, setErrors] = useState<Record<Field, string>>(defaultValue);
  const [loading, setLoading] = useState<boolean>(false);

  const { setAlert } = useAlert();

  const router = useRouter();

  function handleInput(field: Field) {
    return function (e: ChangeEvent<HTMLInputElement>) {
      setData((prev) => ({ ...prev, [field]: e.target.value }));

      if (errors[field] !== "") {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };
  }

  async function handleLogin(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    setLoading(true);

    try {
      const validation = login.parse(data);

      const response: Response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation),
      });

      const { message, token }: AuthResponse = await response.json();

      const responseCode = response.status;

      const alertValue = {
        alertCode: responseCode,
        alertShow: true,
        alertTitle: message.title,
        alertDescription: message.description,
      };

      const toVerify = [200, 403];

      if (toVerify.includes(responseCode)) {
        const page = { "200": "/login/verify", "403": "/verify-email" };

        setAlert({
          ...alertValue,
          alertConfirm: () => {
            router.push(page[String(responseCode) as "200" | "403"] + "?token=" + token);

            setAlert(defaultAlert);
          },
        });

        return;
      }

      const onPage = [400, 500];

      if (onPage.includes(responseCode)) {
        setAlert({
          ...alertValue,
          alertConfirm: () => {
            setAlert(defaultAlert);
          },
        });

        return;
      }

      const fieldErrors = [401, 404];

      if (fieldErrors.includes(responseCode)) {
        const field: Record<"401" | "404", Field> = { "401": "password", "404": "email" };

        setErrors((prev) => ({ ...prev, [field[String(responseCode) as "401" | "404"]]: message.description }));

        return;
      }
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors(parseErrors(error));

        return;
      }

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

  return (
    <main className="h-screen w-full row-center">
      <form
        onSubmit={handleLogin}
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
            Masuk sekarang untuk menikmati kemudahan berbelanja dan penawaran eksklusif.
          </span>
        </div>
        <div className="relative w-full column-center">
          <Input label="Email" name="email" onChange={handleInput("email")} value={data.email} invalid={errors.email} />
          <Input
            label="Kata Sandi"
            name="password"
            forgot_password={true}
            onChange={handleInput("password")}
            value={data.password}
            invalid={errors.password}
          />
          <button
            type="submit"
            className="h-10 my-4 w-40 row-center bg-steel-night font-semibold text-cloud-white rounded-md hover:bg-steel-night/90 hover:text-cloud-white/90 hover:cursor-pointer"
          >
            {!loading && "Masuk"}
            {loading && <Loading />}
          </button>
          <div className="flex gap-1">
            <span className="text-sm select-none">Anda belum memiliki akun?</span>
            <Link href="/register" className="text-sm font-medium select-none hover:underline">
              Registrasi
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
}
