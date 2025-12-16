"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Input from "@/element/Input";
import Loading from "@/element/Loading";

import type { JSX, ChangeEvent, FormEvent } from "react";

type Field = "password" | "confirm_password";

export default function ResetPasswordPage(): JSX.Element {
  const [data, setData] = useState<Record<Field, string>>({ password: "", confirm_password: "" });
  const [errors, setErrors] = useState<Record<Field, string>>({ password: "", confirm_password: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  function handleInput(field: Field) {
    return function (e: ChangeEvent<HTMLInputElement>) {
      setData((prev) => ({ ...prev, [field]: e.target.value }));

      if (errors[field] !== "") {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };
  }

  async function handleResetPassword(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    setLoading(true);
    try {
      const token = searchParams.get("token");
    } catch {
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="h-screen w-full row-center">
      <form
        onSubmit={handleResetPassword}
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
            Silakan buat kata sandi baru untuk akun Anda. Pastikan kata sandi berbeda dari yang sebelumnya demi keamanan.
          </span>
        </div>
        <div className="relative w-full column-center">
          <Input label="Kata Sandi Baru" name="password" onChange={handleInput("password")} value={data.password} invalid={errors.password} />
          <Input
            label="Konfirmasi Kata Sandi"
            name="confirm_password"
            onChange={handleInput("confirm_password")}
            value={data.confirm_password}
            invalid={errors.confirm_password}
          />
          <button
            type="submit"
            className="h-10 my-4 w-40 row-center bg-steel-night font-semibold text-cloud-white rounded-md hover:bg-steel-night/90 hover:text-cloud-white/90 hover:cursor-pointer"
          >
            {!loading && "Atur Ulang"}
            {loading && <Loading />}
          </button>
        </div>
      </form>
    </main>
  );
}
