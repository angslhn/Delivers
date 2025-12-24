import zod from "zod";

const resetPassword = zod.object({
  token: zod
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9]{64}$/, "Token untuk verifikasi masuk pengguna tidak valid."),
  password: zod
    .string()
    .min(8, "Kata sandi minimal 8 karakter")
    .max(64, "Kata sandi maksimal 64 karakter")
    .regex(/[a-z]/, "Wajib mengandung minimal 1 huruf kecil")
    .regex(/[A-Z]/, "Wajib mengandung minimal 1 huruf besar")
    .regex(/[0-9]/, "Wajib mengandung minimal 1 angka")
    .regex(/[\W_]/, "Wajib mengandung minimal 1 simbol"),
});

export default resetPassword;
