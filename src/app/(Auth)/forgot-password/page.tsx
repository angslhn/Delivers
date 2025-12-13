"use client";

import Link from "next/link";

import { ZodError } from "zod";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import { useAlert } from "@/hook/Alert";
import { defaultAlert } from "@/context/AlertContext";

import Input from "@/element/Input";
import Loading from "@/element/Loading";
import parseErrors from "@/helper/parse-errors";
import login from "@/schema/auth/login";

import type { FormEvent, JSX } from "react";
import { UserData } from "@/types/global";

type LoginResponse = {
  message: {
    title: string;
    description: string;
  };
  token?: string;
};

export default function ForgotPasswordPage(): JSX.Element {
  const [data, setData] = useState<Pick<UserData, "email">>({ email: "" });
  const [errors, setErrors] = useState<Pick<UserData, "email">>({ email: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const { setAlert } = useAlert();

  const router = useRouter();

  function handleInput(field: "email") {
    return function (e: ChangeEvent<HTMLInputElement>) {
      setData((prev) => ({ ...prev, [field]: e.target.value }));

      if (errors[field] !== "") {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };
  }

  async function handleForgotPassword(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    setLoading(true);

    try {
      const validation = login.parse(data);

      const response: Response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation),
      });

      const { message, token }: LoginResponse = await response.json();

      const alertValue = {
        alertCode: response.status,
        alertShow: true,
        alertTitle: message.title,
        alertDescription: message.description,
      };

      const toVerifyCodes = [200, 403];

      if (toVerifyCodes.includes(response.status)) {
        const page = { "200": "/login/verify", "403": "/verify-email" };

        setAlert({
          ...alertValue,
          alertConfirm: () => {
            router.push(page[String(response.status) as "200" | "403"] + "?token=" + token);

            setAlert(defaultAlert);
          },
        });

        return;
      }

      const fieldErrors = [401, 404];

      if (fieldErrors.includes(response.status)) {
        const field: Record<"404", "email"> = { "404": "email" };

        setErrors((prev) => ({ ...prev, [field[String(response.status) as "404"]]: message.description }));

        return;
      }
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors((prev) => ({ ...prev, ...parseErrors(error) }));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="h-screen w-full row-center">
      <form
        onSubmit={handleForgotPassword}
        className="xxs:w-11/12 s-plus:w-3/4 s-extra-large:w-2/3 md:w-[23rem] column-center gap-3 px-4 py-4 rounded-xl border border-black/15 shadow"
      >
        <div className="w-full column-center gap-2">
          <div className="row-center gap-2">
            <svg className="w-10 fill-steel-night" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 1000" xmlSpace="preserve">
              <path d="m26.34 115.32 546.04 123.84 1.51 521.82L26.11 887.19l2-112.84 437.38-97.89-1.11-347.65-438.04-96.48zm83.8-52.44v69.22l118.08 26.57V90.44zm119.15 779.76v66.94l-118.08 27.54 1.59-67.56z" />
              <path d="m110.14 753.84 118.08-26.21V278.49l-118.08-25.86z" />
            </svg>
            <h1 className="font-bold text-2xl text-steel-night select-none">Delivers.</h1>
          </div>
          <span className="font-normal text-center text-[0.9rem] text-steel-night select-none">
            Atur ulang kata sandi Anda sekarang agar tidak melewatkan kemudahan berbelanja dan penawaran eksklusif kami.
          </span>
        </div>
        <div className="relative w-full column-center">
          <Input label="Email" name="email" onChange={handleInput("email")} value={data.email} invalid={errors.email} />
          <button
            type="submit"
            className="h-10 w-40 mt-2 row-center bg-steel-night font-semibold text-cloud-white rounded-md hover:bg-steel-night/90 hover:text-cloud-white/90 hover:cursor-pointer"
          >
            {!loading && "Kirim"}
            {loading && <Loading />}
          </button>
        </div>
      </form>
    </main>
  );
}
