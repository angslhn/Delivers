import jwt from "jsonwebtoken";
import otp from "@/helpers/otp";
import bcrypt from "bcryptjs";
import login from "@/schemas/auth/login";
import token from "@/helpers/token";

import { User } from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import { future } from "@/helpers/datetime";

import type { Login, UserData } from "@/types/global";
import env from "@/config/env";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const data: Login = await request.json();

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
      const isNotExpired = !user.expires_at || Date.now() < user.expires_at.getTime();

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

      await User.update({
        id: user.id,
        otp: newOtp,
        token: newToken,
        expires_at: future({ minute: 10 }),
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

    const { jwtSecure, cookieName } = env();

    const { id, fullname, email, phone_number, avatar, role } = user;

    const jwtToken = jwt.sign({ id, fullname, email, phone_number, avatar, role }, jwtSecure as string);

    const response = NextResponse.json(
      {
        message: {
          title: "Berhasil Masuk",
          description: "Anda berhasil masuk. Sekarang Anda dapat menggunakan layanan kami.",
        },
      },
      {
        status: 200,
      }
    );

    response.cookies.set(cookieName as string, jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
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
