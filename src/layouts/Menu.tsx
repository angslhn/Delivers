"use client";

import type { JSX } from "react";

import Link from "next/link";
import { authPath } from "@/resources/path";
import { usePathname } from "next/navigation";

export default function Menu(): JSX.Element {
  const pathname = usePathname();

  const isAuthPath = authPath.some((path) => pathname.startsWith(path));

  if (isAuthPath) return <></>;

  return (
    <nav className="fixed bottom-0 bg-cloud-white w-full h-16 flex justify-center items-center gap-3 border-[0.01rem] border-steel-night/30 shadow-sm">
      <Link href="/" className="relative h-full w-[4.7rem] flex justify-center items-center content-center px-1">
        <svg className="mb-2 w-6 fill-steel-night" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path d="M303.5 5.7c-9-7.6-22.1-7.6-31.1 0l-264 224c-10.1 8.6-11.3 23.7-2.8 33.8s23.7 11.3 33.8 2.8L64 245.5 64 432c0 44.2 35.8 80 80 80l288 0c44.2 0 80-35.8 80-80l0-186.5 24.5 20.8c10.1 8.6 25.3 7.3 33.8-2.8s7.3-25.3-2.8-33.8l-264-224zM112 432l0-227.2L288 55.5 464 204.8 464 432c0 17.7-14.3 32-32 32l-48 0 0-152c0-22.1-17.9-40-40-40l-112 0c-22.1 0-40 17.9-40 40l0 152-48 0c-17.7 0-32-14.3-32-32zm128 32l0-144 96 0 0 144-96 0z" />
        </svg>
        <span className="absolute bottom-1.5 text-xs select-none">Beranda</span>
      </Link>
      <Link href="/recomendation" className="relative h-full w-[4.7rem] flex justify-center items-center content-center px-1">
        <svg className="mb-2 w-5 fill-steel-night" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M89.3 156.3C113 115 143.2 77 170.5 50.4c18.7 18.7 40.9 47.2 60.1 71.7c3.8 4.8 7.4 9.5 10.9 13.9c4.6 5.8 11.7 9.2 19.1 9.1s14.4-3.6 18.9-9.5c3.3-4.3 7.7-10.8 12.3-17.4c2.6-3.8 5.3-7.6 7.8-11.2c5.6-7.9 10.5-14.5 14.4-19.1c20 20.8 41 53 57.4 88.4c17.7 38.2 28.6 77 28.6 106.3c0 103-78.8 181.4-176 181.4c-98.3 0-176-78.4-176-181.4c0-37.5 16.2-82.4 41.3-126.2zM199.5 11.6C183.3-3.8 158-3.9 141.8 11.5c-32 30.1-67 73.6-94.1 121C20.7 179.5 0 233 0 282.6C0 410.9 98.1 512 224 512c124.6 0 224-100.9 224-229.4c0-39.1-13.9-85.2-33.1-126.5C395.7 114.6 369.8 74.9 343 49c-16.3-15.8-42-15.8-58.3-.1c-7.9 7.6-17 20-24.3 30.3l-1.1 1.6C240.6 57 218.4 29.5 199.5 11.6zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z" />
        </svg>
        <span className="absolute bottom-1.5 text-xs select-none">Rekomendasi</span>
      </Link>
      <Link href="/transaction" className="relative h-full w-[4.7rem] flex justify-center items-center content-center px-1">
        <svg className="mb-2 w-6 fill-steel-night" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
          <path d="M48 88l0 80c0 13.3-10.7 24-24 24s-24-10.7-24-24L0 88C0 39.4 39.4 0 88 0L552 0c48.6 0 88 39.4 88 88l0 80c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-80c0-22.1-17.9-40-40-40L88 48C65.9 48 48 65.9 48 88zm416 8l48 0 0 352c0 35.3-28.7 64-64 64l-256 0c-35.3 0-64-28.7-64-64l0-352 48 0 0 304c35.3 0 64 28.7 64 64l160 0c0-35.3 28.7-64 64-64l0-304zM320 352c-53 0-96-35.8-96-80s43-80 96-80s96 35.8 96 80s-43 80-96 80z" />
        </svg>
        <span className="absolute bottom-1.5 text-xs select-none">Transaksi</span>
      </Link>
      <Link href="/account" className="relative h-full w-[4.7rem] flex justify-center items-center content-center px-1">
        <svg className="mb-2 w-5 fill-steel-night" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
        </svg>
        <span className="absolute bottom-1.5 text-xs select-none">Akun</span>
      </Link>
    </nav>
  );
}
