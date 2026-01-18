import { NextRequest, NextResponse } from "next/server";

import { User } from "@/models/User";
import resetPassword from "@/schemas/auth/reset-password";

import type { UserData, AuthResponse } from "@/types/global";
import type { MakeNonNullable } from "@/types/utils";

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const data: MakeNonNullable<UserData, "token" | "password"> = await request.json();

    const validation = resetPassword.safeParse(data);

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

    const user: UserData | null = await User.findByToken(data.token);

    if (!user) {
      return NextResponse.json(
        {
          message: {
            title: "Token Tidak Valid",
            description: "Pengguna dengan token saat ini tidak dapat ditemukan, silahkan coba ke halaman masuk terlebih dahulu",
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
            description: "Akun pengguna tidak dapat mengatur ulang kata sandi karena telah dihapus.",
          },
        },
        { status: 403 }
      );
    }

    const isExpires = user.expired_at && Date.now() > user.expired_at.getTime();

    if (user.token && isExpires) {
      return NextResponse.json(
        {
          message: {
            title: "Tautan Kedaluwarsa",
            description: "Batas waktu mengatur ulang kata sandi telah habis. Silakan ajukan permintaan baru.",
          },
        },
        { status: 410 }
      );
    }

    await User.update(user.id, {
      id: user.id,
      password: data.password,
    });

    return NextResponse.json(
      {
        message: {
          title: "Kata Sandi Diperbarui",
          description: "Kata sandi Anda telah berhasil diubah. Silakan masuk kembali menggunakan kata sandi yang baru.",
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
