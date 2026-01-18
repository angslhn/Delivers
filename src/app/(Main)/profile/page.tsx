"use client";

import type { JSX } from "react";

import Link from "next/link";
import Image from "next/image";
import blank from "@/asset/image/blank.png";
import logout from "@/services/logout";
import { useAuth } from "@/hooks/Auth";
import { useAlert } from "@/hooks/Alert";
import { defaultAlert } from "@/contexts/AlertContext";
import { useRouter } from "next/navigation";

import type { UserPayload } from "@/types/global";

export default function Profile(): JSX.Element {
  const token: UserPayload | null = useAuth();

  const router = useRouter();

  const { setAlert } = useAlert();

  const alertValue = {
    alertCode: 0,
    alertShow: true,
    alertTitle: "Yakin Akan Keluar?",
    alertDescription: "Anda perlu login kembali untuk melanjutkan belanja atau melihat status pesanan.",
  };

  async function onConfirm() {
    setAlert({
      alertCode: 204,
      alertShow: true,
      alertTitle: "Berhasil Keluar",
      alertDescription: "Sampai jumpa kembali! Kami tunggu kunjungan Anda selanjutnya.",
      alertConfirm: () => {
        setAlert(defaultAlert);
      },
    });

    await logout();

    router.refresh();
  }

  async function handleLogout() {
    setAlert({
      ...alertValue,
      alertConfirm: () => onConfirm(),
      alertCancel: () => {
        setAlert(defaultAlert);
      },
    });
  }

  return (
    <main className="w-full overflow-hidden">
      <div className="w-full my-4 row-center gap-3">
        <div className="w-full row-left gap-5 mx-6">
          <Image className="w-12 rounded-full" src={token?.avatar || blank} alt="User" />
          <div className="column-left">
            <span className="text-steel-night font-semibold select-none">{token?.fullname}</span>
            <span className="text-steel-night text-xs select-none">{token?.email}</span>
          </div>
        </div>
      </div>
      <div className="w-full my-4 mx-6 column-left gap-3">
        <span className="text-steel-night font-semibold">Pengaturan Akun</span>
        <div className="column-left gap-6">
          <Link href="/user" className="row-center gap-3">
            <svg className="ml-0.5 w-5 fill-steel-night" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
            </svg>
            <div className="column-left">
              <span className="ml-0.5 font-semibold text-s select-none">Informasi Pribadi</span>
              <span className="ml-0.5 text-xs select-none">Ubah informasi pribadi tentang akun Anda</span>
            </div>
          </Link>
          <Link href="/address" className="row-center gap-3">
            <svg className="w-6 fill-steel-night" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path d="M352 48l224 0c8.8 0 16 7.2 16 16l0 384c0 8.8-7.2 16-16 16l-160 0c0 18-6 34.6-16 48l176 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L352 0c-35.3 0-64 28.7-64 64l0 60.6 48 44L336 64c0-8.8 7.2-16 16-16zm61.2 208l18.8 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16l0 4.6 6.1 5.6c11.2 10.3 19.2 23.4 23.1 37.9zm2.8 96l16 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-16 0 0 64zm64-144l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm16 80c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM400 96c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm80 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM20.8 237C7.5 249.1 0 266.2 0 284.2L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-163.8c0-17.9-7.5-35.1-20.8-47.2l-128-117.3c-24.5-22.4-62-22.4-86.5 0L20.8 237zM48 284.2c0-4.5 1.9-8.8 5.2-11.8L181.2 155c6.1-5.6 15.5-5.6 21.6 0l128 117.3c3.3 3 5.2 7.3 5.2 11.8L336 448c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-163.8zM144 296l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24z" />
            </svg>
            <div className="column-left">
              <span className="font-semibold text-[0.9rem] select-none">Tambahkan Alamat</span>
              <span className="text-xs select-none">Tambahkan informasi alamat tujuan pesanan Anda</span>
            </div>
          </Link>
          <Link href="/payment" className="row-center gap-3">
            <svg className="w-6 fill-steel-night" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M512 80c8.8 0 16 7.2 16 16l0 32L48 128l0-32c0-8.8 7.2-16 16-16l448 0zm16 144l0 192c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16l0-192 480 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24l48 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0z" />
            </svg>
            <div className="column-left">
              <span className="font-semibold text-[0.9rem] select-none">Pembayaran</span>
              <span className="text-xs select-none">Tambahkan pembayaran untuk pesanan Anda</span>
            </div>
          </Link>
          <Link href="/security" className="row-center gap-3">
            <svg className="ml-0.5 w-5 fill-steel-night" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M224 48c44.2 0 80 35.8 80 80l0 64-160 0 0-64c0-44.2 35.8-80 80-80zM96 128l0 64-32 0c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-32 0 0-64C352 57.3 294.7 0 224 0S96 57.3 96 128zM64 240l320 0c8.8 0 16 7.2 16 16l0 192c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-192c0-8.8 7.2-16 16-16zm184 80c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 64c0 13.3 10.7 24 24 24s24-10.7 24-24l0-64z" />
            </svg>
            <div className="column-left">
              <span className="ml-0.5 font-semibold text-[0.9rem] select-none">Keamanan</span>
              <span className="ml-0.5 text-xs select-none">Lindungi kata sandi, PIN, dan verifikasi diri Anda</span>
            </div>
          </Link>
          <Link href="/notification" className="row-center gap-3">
            <svg className="w-6 fill-steel-night" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M256 0c-17.7 0-32 14.3-32 32l0 19.2C151 66 96 130.6 96 208l0 25.4c0 45.4-15.5 89.5-43.8 124.9L37.3 377c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l400 0c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C431.5 322.9 416 278.8 416 233.4l0-25.4c0-77.4-55-142-128-156.8L288 32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112l0 25.4c0 47.9 13.9 94.6 39.7 134.6l-303.4 0c25.8-40 39.7-86.7 39.7-134.6l0-25.4c0-61.9 50.1-112 112-112zm64 352l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3zM113.4 15.4c-9.1-9.6-24.3-10-33.9-.8C30.5 61.2 0 127.1 0 200c0 13.3 10.7 24 24 24s24-10.7 24-24c0-59.3 24.8-112.7 64.6-150.6c9.6-9.1 10-24.3 .8-33.9zM399.4 49.4C439.2 87.3 464 140.7 464 200c0 13.3 10.7 24 24 24s24-10.7 24-24c0-72.9-30.5-138.8-79.4-185.4c-9.6-9.1-24.8-8.8-33.9 .8s-8.8 24.8 .8 33.9z" />
            </svg>
            <div className="column-left">
              <span className="font-semibold text-[0.9rem] select-none">Pemberitahuan</span>
              <span className="text-xs select-none">Tampilkan pemberitahuan yang diterima Anda</span>
            </div>
          </Link>
          <div className="row-center gap-3">
            <svg className="ml-0.5 w-5 fill-steel-night" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M505 273c9.4-9.4 9.4-24.6 0-33.9L377 111c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l87 87L184 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l246.1 0-87 87c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0L505 273zM168 80c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 32C39.4 32 0 71.4 0 120L0 392c0 48.6 39.4 88 88 88l80 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-80 0c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l80 0z" />
            </svg>
            <div className="column-left">
              <button type="button" onClick={handleLogout} className="ml-0.5 font-semibold text-[0.9rem] select-none">
                Keluar
              </button>
              <span className="ml-0.5 text-xs select-none">Keluar dari sesi akun saat ini</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
