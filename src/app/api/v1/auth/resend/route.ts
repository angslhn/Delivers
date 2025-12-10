import { NextRequest, NextResponse } from "next/server";

import { User } from "@/model/User";
import { future } from "@/helpers/datetime";

import otp from "@/helpers/otp";
import token from "@/helpers/token";
import resend from "@/schemas/auth/resend";

import type { Resend, UserData } from "@/types/global";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const data: Resend = await request.json();

    const validation = resend.safeParse(data);

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
            description: "Akun pengguna tidak dapat melakukan verifikasi karena telah dihapus.",
          },
        },
        { status: 403 }
      );
    }

    const isExpires = user.expires_at && Date.now() > user.expires_at.getTime();

    if (user.token && isExpires) {
      return NextResponse.json(
        {
          message: {
            title: "Token Kadaluwarsa",
            description: "Sesi token verifikasi Anda telah berakhir. Silakan masuk dahulu untuk memperbarui token verifikasi.",
          },
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
          title: "Kode Dikirim Ulang",
          description: "Kode verifikasi baru telah dikirim ke email Anda. Mohon cek folder Inbox atau Spam.",
        },
        token: newToken,
        delay_request: 1,
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
