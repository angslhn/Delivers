"use client";

import type { JSX } from "react";

import Link from "next/link";
import Image from "next/image";
import blank from "@/assets/images/blank.png";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/Auth";

import type { UserPayload } from "@/types/global";

export default function Account(): JSX.Element {
  const router = useRouter();

  const token: UserPayload | null = useAuth();

  function handleNavigate(path: string) {
    return () => router.push(path);
  }

  return (
    <main className="w-full overflow-hidden">
      <div className="w-full my-4 row-center gap-3">
        {!token && (
          <>
            <button
              type="button"
              onClick={handleNavigate("/login")}
              className="h-8 w-32 text-cloud-white font-semibold text-sm bg-steel-night rounded-md hover:cursor-pointer"
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={handleNavigate("/register")}
              className="h-8 w-32 text-steel-night font-semibold text-sm border border-steel-night rounded-md hover:cursor-pointer"
            >
              Daftar
            </button>
          </>
        )}
        {token && (
          <div className="w-full row-left gap-5 mx-6">
            <Image className="w-12 rounded-full" src={blank} alt="User" />
            <span className="text-steel-night font-semibold select-none">{token.fullname}</span>
          </div>
        )}
      </div>
      <div className="w-full h-2 bg-gray-200" />
      <div className="w-full column-left gap-5 mx-6 py-4">
        {token && (
          <Link href="/profile" className="row-center gap-4">
            <svg className="ml-0.5 w-5 fill-steel-night" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
            </svg>
            <span className="ml-0.5 text-[0.9rem] select-none">Pengaturan Akun</span>
          </Link>
        )}
        <Link href="/transaction" className="row-center gap-4">
          <svg className="w-6 fill-steel-night" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path d="M48 88l0 80c0 13.3-10.7 24-24 24s-24-10.7-24-24L0 88C0 39.4 39.4 0 88 0L552 0c48.6 0 88 39.4 88 88l0 80c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-80c0-22.1-17.9-40-40-40L88 48C65.9 48 48 65.9 48 88zm416 8l48 0 0 352c0 35.3-28.7 64-64 64l-256 0c-35.3 0-64-28.7-64-64l0-352 48 0 0 304c35.3 0 64 28.7 64 64l160 0c0-35.3 28.7-64 64-64l0-304zM320 352c-53 0-96-35.8-96-80s43-80 96-80s96 35.8 96 80s-43 80-96 80z" />
          </svg>
          <span className="text-[0.9rem] select-none">Daftar Transaksi</span>
        </Link>
        <Link href="/cart" className="row-center gap-4">
          <svg className="w-6 fill-steel-night" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48l45.5 0c3.8 0 7.1 2.7 7.9 6.5l51.6 271c6.5 34 36.2 58.5 70.7 58.5L488 384c13.3 0 24-10.7 24-24s-10.7-24-24-24l-288.3 0c-11.5 0-21.4-8.2-23.6-19.5L170.7 288l288.5 0c32.6 0 61.1-21.8 69.5-53.3l41-152.3C576.6 57 557.4 32 531.1 32l-411 0C111 12.8 91.6 0 69.5 0L24 0zM131.1 80l389.6 0L482.4 222.2c-2.8 10.5-12.3 17.8-23.2 17.8l-297.6 0L131.1 80zM176 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm336-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z" />
          </svg>
          <span className="text-[0.9rem] select-none">Keranjang</span>
        </Link>
        <Link href="/wishlist" className="row-center gap-[0.9rem]">
          <svg className="w-6.5 fill-steel-night" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z" />
          </svg>
          <span className="text-[0.9rem] select-none">Wishlist</span>
        </Link>
        <Link href="/review" className="row-center gap-4">
          <svg className="w-6 fill-steel-night" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
          </svg>
          <span className="text-[0.9rem] select-none">Ulasan</span>
        </Link>
      </div>
      <div className="w-full h-2 bg-gray-200" />
      <div className="w-full column-left gap-5 mx-6 py-4">
        <Link href="/review" className="row-center gap-4">
          <svg className="w-6 fill-steel-night" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M64 464l246.7 0c11 14.4 24.1 28.1 39.5 40.4c-9 4.8-19.3 7.6-30.2 7.6L64 512c-35.3 0-64-28.7-64-64L0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3l0 52.5-48 19.2 0-66.2-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16zM423.1 225.7c5.7-2.3 12.1-2.3 17.8 0l120 48C570 277.4 576 286.2 576 296c0 63.3-25.9 168.8-134.8 214.2c-5.9 2.5-12.6 2.5-18.5 0C313.9 464.8 288 359.3 288 296c0-9.8 6-18.6 15.1-22.3l120-48zM527.4 312L432 273.8l0 187.8c68.2-33 91.5-99 95.4-149.7z" />
          </svg>
          <span className="text-[0.9rem] select-none">Kebijakan dan Privasi</span>
        </Link>
        <Link href="/review" className="row-center gap-4">
          <svg className="w-6 fill-steel-night" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M48 256C48 141.1 141.1 48 256 48s208 93.1 208 208l0 144.1c0 22.1-17.9 40-40 40L313.6 440c-8.3-14.4-23.8-24-41.6-24l-32 0c-26.5 0-48 21.5-48 48s21.5 48 48 48l32 0c17.8 0 33.3-9.7 41.6-24l110.4 .1c48.6 0 88.1-39.4 88.1-88L512 256C512 114.6 397.4 0 256 0S0 114.6 0 256l0 40c0 13.3 10.7 24 24 24s24-10.7 24-24l0-40zm112-32l0 112c-17.7 0-32-14.3-32-32l0-48c0-17.7 14.3-32 32-32zM80 256l0 48c0 44.2 35.8 80 80 80l16 0c17.7 0 32-14.3 32-32l0-144c0-17.7-14.3-32-32-32l-16 0c-44.2 0-80 35.8-80 80zm272-32c17.7 0 32 14.3 32 32l0 48c0 17.7-14.3 32-32 32l0-112zm80 32c0-44.2-35.8-80-80-80l-16 0c-17.7 0-32 14.3-32 32l0 144c0 17.7 14.3 32 32 32l16 0c44.2 0 80-35.8 80-80l0-48z" />
          </svg>
          <span className="text-[0.9rem] select-none">Bantuan Delivers Care</span>
        </Link>
      </div>
    </main>
  );
}
