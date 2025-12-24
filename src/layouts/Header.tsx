"use client";

import type { JSX } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authPath, accountPath } from "@/resources/path";
import { useViewport } from "@/hooks/Viewport";

export default function Header(): JSX.Element | undefined {
  const router = useRouter();
  const pathname = usePathname();

  const [width] = useViewport();

  const isAuthPath = authPath.some((path) => pathname.startsWith(path));
  const isAccountPath = accountPath.some((path) => pathname.startsWith(path));

  if (!isAuthPath) {
    return (
      <header
        className={`${isAccountPath ? "h-12" : "h-16"} w-full flex justify-between items-center xxs:gap-4 sm:gap-0 xxs:px-2 sm:px-5 lg:px-8 bg-steel-night`}
      >
        {/* Tampilan logo dan bar pencarian yang hanya di tampilkan ketika di luar halaman akun */}
        {!isAccountPath && (
          <>
            <div aria-label="Icon Logo" className="h-full xxs:w-14 s-extra-large:w-36 sm:w-44 flex justify-center items-center gap-2">
              <svg
                className="fill-cloud-white xxs:w-7 md:w-8 hover:cursor-pointer hover:fill-cloud-white/90"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 600 1000"
                xmlSpace="preserve"
              >
                <path d="m26.34 115.32 546.04 123.84 1.51 521.82L26.11 887.19l2-112.84 437.38-97.89-1.11-347.65-438.04-96.48zm83.8-52.44v69.22l118.08 26.57V90.44zm119.15 779.76v66.94l-118.08 27.54 1.59-67.56z" />
                <path d="m110.14 753.84 118.08-26.21V278.49l-118.08-25.86z" />
              </svg>
              {width >= 450 && <h1 className="xxs:text-[1.30rem] md:text-2xl font-bold text-cloud-white">Delivers.</h1>}
            </div>
            <div className="relative flex justify-center items-center h-9 xxs:w-3/5 s-plus:w-8/12 s-large:w-1/2 sm:w-1/3 md:w-1/2 lg:w-2/3">
              <svg className="absolute xxs:left-2 md:left-3 w-4.5 fill-steel-night/80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M368 208A160 160 0 1 0 48 208a160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z" />
              </svg>
              <input
                type="text"
                className="h-11/12 w-full xxs:px-8 xxs:text-sm md:px-10 rounded-sm font-normal placeholder:text-steel-night/90 bg-cloud-white border-none outline-none"
                placeholder="Cari barang pilihanmu"
              />
            </div>
          </>
        )}
        {isAccountPath && (
          <div className="row-center">
            {pathname.includes("/profile") && (
              <svg
                onClick={() => router.back()}
                role="button"
                className="ml-1.5 fill-cloud-white w-4 hover:fill-cloud-white/90"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M7.4 273.4C2.7 268.8 0 262.6 0 256s2.7-12.8 7.4-17.4l176-168c9.6-9.2 24.8-8.8 33.9 .8s8.8 24.8-.8 33.9L83.9 232 424 232c13.3 0 24 10.7 24 24s-10.7 24-24 24L83.9 280 216.6 406.6c9.6 9.2 9.9 24.3 .8 33.9s-24.3 9.9-33.9 .8l-176-168z" />
              </svg>
            )}
            <span className="mx-2 font-semibold text-s select-none text-cloud-white">Akun Pengguna</span>
          </div>
        )}
        <nav className="h-full xxs:w-16 s-plus:w-24 s-extra-large:w-36 sm:w-44 flex justify-center items-center s-extra-large:gap-1">
          {/* Menu Wishlist dan Keranjang untuk tampilan mobile */}
          {width <= 450 && !isAccountPath && (
            <div className="flex justify-center items-center gap-2">
              <Link href="/wishlist">
                <svg className="fill-cloud-white w-7" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z" />
                </svg>
              </Link>
              <Link href="/cart">
                <svg className="w-6 fill-cloud-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48l45.5 0c3.8 0 7.1 2.7 7.9 6.5l51.6 271c6.5 34 36.2 58.5 70.7 58.5L488 384c13.3 0 24-10.7 24-24s-10.7-24-24-24l-288.3 0c-11.5 0-21.4-8.2-23.6-19.5L170.7 288l288.5 0c32.6 0 61.1-21.8 69.5-53.3l41-152.3C576.6 57 557.4 32 531.1 32l-411 0C111 12.8 91.6 0 69.5 0L24 0zM131.1 80l389.6 0L482.4 222.2c-2.8 10.5-12.3 17.8-23.2 17.8l-297.6 0L131.1 80zM176 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm336-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z" />
                </svg>
              </Link>
            </div>
          )}
        </nav>
      </header>
    );
  }
}
