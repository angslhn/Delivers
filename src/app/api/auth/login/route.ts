import otp from "@/helpers/otp";
import bcrypt from "bcryptjs";
import login from "@/schemas/auth/login";
import token from "@/helpers/token";

import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { future } from "@/helpers/datetime";

import type { AuthResponse, UserData } from "@/types/global";

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const data: Pick<UserData, "email" | "password"> = await request.json();

    const validation = login.safeParse(data);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: {
            title: "Data Tidak Valid",
            description: "Data yang diterima oleh server tidak valid, proses pendaftaran pengguna tidak dapat di proses.",
          },
        },
        { status: 400 }
      );
    }

    const user: UserData | null = await User.findByEmail(data.email);

    if (!user) {
      return NextResponse.json(
        {
          message: {
            title: "Email Belum Terdaftar",
            description: "Email yang digunakan belum terdaftar",
          },
        },
        { status: 404 }
      );
    }

    if (user.status === "pending") {
      const isNotExpired = !user.expired_at || Date.now() < user.expired_at.getTime();

      if (isNotExpired) {
        return NextResponse.json(
          {
            message: {
              title: "Verifikasi Belum Selesai",
              description: "Akun belum terverifikasi. Silakan masukkan kode verifikasi yang sebelumnya dikirimkan ke email.",
            },
            token: user.token,
          },
          { status: 403 }
        );
      }

      const newOtp = otp(6);
      const newToken = token(64);

      await User.update(user.id, {
        otp: newOtp,
        token: newToken,
        expired_at: future({ minute: 10 }),
      });

      return NextResponse.json(
        {
          message: {
            title: "Verifikasi Diperlukan",
            description: "Akun belum terverifikasi. Sistem akan mengarahkan Anda ke halaman verifikasi.",
          },
          token: newToken,
        },
        { status: 403 }
      );
    }

    const isSamePassword = await bcrypt.compare(data.password, user.password);

    if (!isSamePassword) {
      return NextResponse.json(
        {
          message: {
            title: "Gagal Masuk",
            description: "Kata sandi yang Anda masukkan salah",
          },
        },
        { status: 401 }
      );
    }

    const newOtp = otp(6);
    const newToken = token(64);

    await User.update(user.id, {
      otp: newOtp,
      token: newToken,
      expired_at: future({ minute: 10 }),
    });

    return NextResponse.json(
      {
        message: {
          title: "Verifikasi Diperlukan",
          description: `Kode OTP telah dikirim ke ${user.email}. Silakan cek kotak masuk Anda.`,
        },
        token: newToken,
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
