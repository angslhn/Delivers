"use client";

import type { ChangeEvent, FormEvent, JSX } from "react";

import Link from "next/link";
import { useState } from "react";
import { ZodError } from "zod";

import signupSchema from "@/schemas/register";
import Input from "@/components/element/Input";
import Loading from "@/components/element/Loading";

import type { FormRegister } from "@/types/global";
import capitalize from "@/helpers/capitalize";

type Field = "fullname" | "email" | "password";

export default function Register(): JSX.Element {
  const [data, setData] = useState<FormRegister>({ fullname: "", email: "", password: "" });
  const [errors, setErrors] = useState<Record<"fullname" | "email" | "password", string>>();
  const [loading, setLoading] = useState<boolean>(false);

  function handleInput(field: Field) {
    return function (e: ChangeEvent<HTMLInputElement>) {
      const value = field !== "fullname" ? e.target.value : capitalize(e.target.value);

      setData((prev) => ({ ...prev, [field]: value }));

      if (errors && errors[field]) {
        setErrors((prev) => {
          if (!prev) return undefined;

          const newErrors = { ...prev };

          delete newErrors[field];

          return newErrors;
        });
      }
    };
  }

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const form = signupSchema.parse(data);

      const response: Response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      console.log(result);
    } catch (error) {
      if (error instanceof ZodError) {
        const zodIssues = error.issues;

        const errors = zodIssues.reduce(
          (acc, issue) => {
            const field = issue.path[0] as string;
            const message = issue.message;

            if (!acc[field]) {
              acc[field] = message;
            }

            return acc;
          },
          {} as Record<string, string>
        );

        return setErrors(errors);
      }
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
            <svg className="w-12 fill-steel-night" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 1000" xmlSpace="preserve">
              <path d="m26.34 115.32 546.04 123.84 1.51 521.82L26.11 887.19l2-112.84 437.38-97.89-1.11-347.65-438.04-96.48zm83.8-52.44v69.22l118.08 26.57V90.44zm119.15 779.76v66.94l-118.08 27.54 1.59-67.56z" />
              <path d="m110.14 753.84 118.08-26.21V278.49l-118.08-25.86z" />
            </svg>
            <h1 className="font-bold text-3xl text-steel-night select-none">Delivers.</h1>
          </div>
          <span className="font-normal text-center text-[0.9rem] text-steel-night select-none">
            Bergabung sekarang! Dan dapatkan beberapa pengalaman terbaik saat berbelanja di Delivers.
          </span>
        </div>
        <div className="w-full column-center gap-1">
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
