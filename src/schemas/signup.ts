import zod from "zod";

const signupSchema = zod.object({
  fullname: zod.string().trim().min(3, "Nama lengkap terlalu pendek minimal 3 huruf").max(55, "Nama lengkap terlalu panjang maksimal 55 huruf"),
  email: zod.email("Format email yang digunakan tidak valid").trim().toLowerCase().max(255, "Email yang digunakan telalu panjang atau tidak valid"),
  password: zod
    .string()
    .min(8, "Kata sandi minimal 8 karakter")
    .max(64, "Kata sandi maksimal 64 karakter")
    .regex(/[a-z]/, "Wajib mengandung minimal 1 huruf kecil")
    .regex(/[A-Z]/, "Wajib mengandung minimal 1 huruf besar")
    .regex(/[0-9]/, "Wajib mengandung minimal 1 angka")
    .regex(/[\W_]/, "Wajib mengandung minimal 1 simbol (@, #, $, dll)"),
});
