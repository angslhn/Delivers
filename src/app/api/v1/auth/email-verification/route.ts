import verifyEmail from "@/schemas/auth/verify-email";
import { NextRequest, NextResponse } from "next/server";

import type { VerifyEmail } from "@/types/global";

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

    return NextResponse.json({}, {});
  } catch {
    return NextResponse.json({}, {});
  }
}
