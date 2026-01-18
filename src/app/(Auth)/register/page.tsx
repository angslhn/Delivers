"use client";

import type { ChangeEvent, FormEvent, JSX } from "react";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/hooks/Alert";
import { defaultAlert } from "@/contexts/AlertContext";

import signupSchema from "@/schemas/auth/register";
import capitalize from "@/helpers/capitalize";

import Input from "@/elements/Input";
import Loading from "@/elements/Loading";

import type { AuthResponse } from "@/types/global";

const defaultValue = { fullname: "", email: "", password: "" };

export default function RegisterPage(): JSX.Element {
  const [data, setData] = useState<Record<string, string>>(defaultValue);
  const [errors, setErrors] = useState<Record<string, string>>(defaultValue);
  const [loading, setLoading] = useState<boolean>(false);

  const { setAlert } = useAlert();

  const router = useRouter();

  function handleInput(field: "fullname" | "email" | "password") {
    return function (e: ChangeEvent<HTMLInputElement>) {
      const value = field !== "fullname" ? e.target.value : capitalize(e.target.value);

      setData((prev) => ({ ...prev, [field]: value }));

      if (errors[field] !== "") {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };
  }

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const validation = signupSchema.parse(data);

      const response: Response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation),
      });

      const { message, token }: AuthResponse = await response.json();

      const codeResponse = response.status;

      const alertValue = {
        alertCode: response.status,
        alertShow: true,
        alertTitle: message.title,
        alertDescription: message.description,
      };

      if (response.status === 201) {
        setAlert({
          ...alertValue,
          alertConfirm: () => {
            setAlert(defaultAlert);

            router.push("/verify-email?token=" + token);
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

      if (response.status === 409) {
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

  return (
    <main className="h-screen w-full row-center">
      <form
        onSubmit={handleRegister}
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
            Bergabung sekarang! Dan dapatkan beberapa pengalaman terbaik saat berbelanja di Delivers.
          </span>
        </div>
        <div className="w-full column-center">
          <Input label="Nama Lengkap" name="fullname" onChange={handleInput("fullname")} value={data.fullname} invalid={errors?.fullname} />
          <Input label="Email" name="email" onChange={handleInput("email")} value={data.email} invalid={errors?.email} />
          <Input label="Kata Sandi" name="password" onChange={handleInput("password")} value={data.password} invalid={errors?.password} />
          <button
            type="submit"
            className="h-10 my-4 w-40 row-center bg-steel-night font-semibold text-cloud-white rounded-md hover:bg-steel-night/90 hover:text-cloud-white/90 hover:cursor-pointer"
          >
            {!loading && "Daftar"}
            {loading && <Loading />}
          </button>
          <div className="flex gap-1">
            <span className="text-sm select-none">Anda sudah memiliki akun?</span>
            <Link href="/login" className="text-sm font-medium select-none hover:underline">
              Masuk
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
}
