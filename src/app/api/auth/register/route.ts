import id from "@/helpers/id";
import otp from "@/helpers/otp";
import bcrypt from "bcryptjs";
import token from "@/helpers/token";
import register from "@/schemas/auth/register";

import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { future } from "@/helpers/datetime";

import type { UserData, AuthResponse } from "@/types/global";

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const data: Pick<UserData, "fullname" | "email" | "password"> = await request.json();

    const validation = register.safeParse(data);

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

    const user = await User.findByEmail(data.email);

    if (user) {
      return NextResponse.json(
        {
          message: {
            title: "Email Telah Terdaftar",
            description: "Email yang digunakan untuk pendaftaran oleh Anda, telah terdaftar silahkan untuk masuk.",
          },
        },
        { status: 409 }
      );
    }

    const newOtp = otp(6);
    const newToken = token(64);

    const hashed = await bcrypt.hash(validation.data.password, 12);

    await User.create({
      ...validation.data,
      id: id(),
      password: hashed,
      otp: newOtp,
      token: newToken,
      expired_at: future({ minute: 10 }),
    });

    return NextResponse.json(
      {
        message: {
          title: "Pendaftaran Pengguna Berhasil",
          description: "Pendaftaran pengguna berhasil, Anda akan dialihkan ke halaman verifikasi email.",
        },
        token: newToken,
      },
      { status: 201 }
    );
  } catch (errors) {
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
