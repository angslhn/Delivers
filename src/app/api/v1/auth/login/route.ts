import login from "@/schemas/auth/login";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/model/User";

import type { Login, UserData } from "@/types/global";

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

    return NextResponse.json({}, {});
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
