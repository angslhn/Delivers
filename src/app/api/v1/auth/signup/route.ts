import zod from "zod";
import bcrypt from "bcryptjs";
import signupSchema from "@/schemas/signup";

import { User } from "@/models/User";

import { CreateUser } from "@/types/app";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data: CreateUser = await request.json();

    // Cek apakah data valid
    const validation = signupSchema.safeParse(data);

    // Jika data yang dikirimkan tidak valid
    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Data dikirimkan tidak valid",
          errors: zod.treeifyError(validation.error),
        },
        { status: 400 }
      );
    }

    // Cari pengguna berdasarkan email
    const user = await User.findByEmail(data.email);

    // Jika pengguna dengan email yang dicari telah tersedia maka ia sudah terdaftar
    if (user) {
      return NextResponse.json({ message: "Email tersebut telah terdaftar" }, { status: 409 });
    }

    // Hashing kata sandi
    const hashed = await bcrypt.hash(validation.data.password, 12);

    // Simpan data ke database
    await User.create({ ...validation.data, password: hashed });

    // Berikan respon berhasil
    return NextResponse.json({ message: "Pendaftaran pengguna berhasil, Anda akan dialihkan ke halaman masuk." }, { status: 201 });
  } catch (errors) {
    return NextResponse.json(
      {
        message: "Terjadi kesalahan pada server",
        details: errors,
      },
      { status: 500 }
    );
  }
}
