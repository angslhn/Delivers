import verifyEmail from "@/schemas/auth/verify-email";
import { NextRequest, NextResponse } from "next/server";

import { User } from "@/model/User";

import type { UserData, VerifyEmail } from "@/types/global";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const data: VerifyEmail = await request.json();

    const validation = verifyEmail.safeParse(data);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: {
            title: "Data Tidak Valid",
            description: "Data yang diterima oleh server tidak valid, proses verifikasi email pengguna tidak dapat di proses.",
          },
        },
        { status: 400 }
      );
    }

    const user: UserData | null = await User.findByToken(data.token);

    if (!user) {
      return NextResponse.json(
        {
          message: {
            title: "Akun Tidak Ditemukan",
            description: "Akun pengguna tidak ditemukan untuk memverifikasi email, silahkan kembali ke halaman masuk.",
          },
        },
        { status: 404 }
      );
    }

    if (user.status === "active") {
      return NextResponse.json(
        {
          message: {
            title: "Akun Telah Aktif",
            description: "Akun pengguna ini sudah aktif dan tidak memerlukan verifikasi ulang.",
          },
        },
        { status: 409 }
      );
    }

    if (user.status === "deleted") {
      return NextResponse.json(
        {
          message: {
            title: "Akun Telah Dihapus",
            description: "Akun pengguna tidak dapat melakukan verifikasi karena telah dihapus.",
          },
        },
        { status: 403 }
      );
    }

    const otpExpired = !user.otp_expired || Date.now() > user.otp_expired.getTime();

    if (otpExpired) {
      await User.update({ id: user.id, otp: null, otp_expired: null });

      return NextResponse.json(
        {
          message: {
            title: "Kode Verifikasi Kadaluwarsa",
            description: "Kode verifikasi yang Anda gunakan telah kadaluwarsa, silahkan untuk meminta kirim ulang.",
          },
        },
        { status: 400 }
      );
    }

    const tokenExpired = !user.token_expired || Date.now() > user.token_expired.getTime();

    if (tokenExpired) {
      await User.update({ id: user.id, token: null, token_expired: null });

      return NextResponse.json(
        {
          message: {
            title: "Token Telah Kadaluwarsa",
            description: "Token untuk verifikasi telah kadaluwarsa, silahkan untuk masuk terlebih dahulu untuk memperbarui token.",
          },
        },
        { status: 400 }
      );
    }

    if (user.otp !== data.otp) {
      return NextResponse.json(
        {
          message: {
            title: "Kode Verifikasi Salah",
            description: "Kode yang Anda masukkan tidak cocok. Silakan periksa kembali inbox email Anda dan coba lagi.",
          },
        },
        { status: 400 }
      );
    }

    await User.update({ id: user.id, status: "active", otp: null, otp_expired: null, token: null, token_expired: null });

    return NextResponse.json(
      {
        message: {
          title: "Verifikasi Berhasil",
          description: "Selamat! Akun Anda telah berhasil diverifikasi. Silakan masuk untuk melanjutkan.",
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        message: {
          title: "Kesalahan Pada Server",
          description: "Sepertinya terjadi kesalahan pada server, permintaan saat ini tidak dapat di proses.",
        },
      },
      { status: 500 }
    );
  }
}
