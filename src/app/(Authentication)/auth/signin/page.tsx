import type { JSX } from "react";

import Link from "next/link";

export default function Signin(): JSX.Element {
  return (
    <main className="h-screen w-full row-center">
      <form className="xxs:w-11/12 s-plus:w-3/4 s-extra-large:w-2/3 md:w-[23rem] flex flex-col justify-center items-center gap-5 px-4 py-4 rounded-xl border border-black/15 shadow">
        <div className="w-full column-center gap-3">
          <div className="row-center gap-2">
            <svg className="w-12 fill-steel-night" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 1000" xmlSpace="preserve">
              <path d="m26.34 115.32 546.04 123.84 1.51 521.82L26.11 887.19l2-112.84 437.38-97.89-1.11-347.65-438.04-96.48zm83.8-52.44v69.22l118.08 26.57V90.44zm119.15 779.76v66.94l-118.08 27.54 1.59-67.56z" />
              <path d="m110.14 753.84 118.08-26.21V278.49l-118.08-25.86z" />
            </svg>
            <h1 className="font-bold text-3xl text-steel-night select-none">Delivers.</h1>
          </div>
          <span className="font-normal text-center text-[0.9rem] text-steel-night select-none">
            Masuk sekarang untuk menikmati kemudahan berbelanja dan penawaran eksklusif.
          </span>
        </div>
        <div className="w-full column-center gap-3">
          <div className="w-full column-left gap-1">
            <label className="text-sm font-medium text-steel-night select-none" htmlFor="email">
              Email
            </label>
            <input name="email" type="text" className="h-8 w-full px-2 rounded-sm shadow outline-none border border-steel-night/40" />
          </div>
          <div className="w-full column-left gap-1">
            <label className="text-sm font-medium text-steel-night select-none" htmlFor="password">
              Kata Sandi
            </label>
            <input name="password" type="text" className="h-8 w-full px-2 rounded-sm shadow outline-none border border-steel-night/40" />
          </div>
          <button
            type="submit"
            className="h-10 my-4 px-14 bg-steel-night font-semibold text-cloud-white rounded-md hover:bg-steel-night/90 hover:text-cloud-white/90 hover:cursor-pointer"
          >
            Masuk
          </button>
          <div className="flex gap-1">
            <span className="text-sm select-none">Anda belum memiliki akun?</span>
            <Link href="/auth/signup" className="text-sm font-medium select-none hover:underline">
              Daftar sekarang
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
}
