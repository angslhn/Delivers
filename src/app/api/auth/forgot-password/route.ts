import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User";

import { future } from "@/helpers/datetime";
import forgotPassword from "@/schemas/auth/forgot-password";
import token from "@/helpers/token";

import type { AuthResponse, UserData } from "@/types/global";

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const data: Pick<UserData, "email"> = await request.json();

    const validation = forgotPassword.safeParse(data);

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
            title: "Email Tidak Ditemukan",
            description: "Email ini tidak dapat ditemukan",
          },
        },
        { status: 404 }
      );
    }

    const newToken = token(64);

    await User.update(user.id, {
      token: newToken,
      expired_at: future({ minute: 10 }),
    });

    return NextResponse.json(
      {
        message: {
          title: "Periksa Email Anda",
          description: `Kami telah mengirimkan tautan untuk mengatur ulang kata sandi ke ${user.email}. Silakan periksa kotak masuk inbox Anda.`,
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
