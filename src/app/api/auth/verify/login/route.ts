import jwt from "jsonwebtoken";
import env from "@/config/env";
import verifyLogin from "@/schemas/auth/verify-login";

import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

import type { UserData, AuthResponse } from "@/types/global";
import type { PickNonNullable } from "@/types/utils";

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const data: PickNonNullable<UserData, "token" | "otp"> = await request.json();

    const validation = verifyLogin.safeParse(data);

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

    const isExpired = !user.expired_at || Date.now() > user.expired_at.getTime();

    if (isExpired) {
      await User.update(user.id, {
        otp: null,
        token: null,
        expired_at: null,
      });

      return NextResponse.json(
        {
          message: {
            title: "Sesi Verifikasi Berakhir",
            description: "Saat ini waktu verifikasi email telah habis. Silakan minta kode baru.",
          },
        },
        { status: 422 }
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

    await User.update(user.id, { otp: null, token: null, expired_at: null });

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
