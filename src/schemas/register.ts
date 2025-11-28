import zod from "zod";

const register = zod.object({
  fullname: zod
    .string()
    .trim()
    .min(1, "Nama lengkap harus diisi")
    .regex(/^[a-zA-Z\s'.]+$/, "Nama lengkap tidak boleh selain huruf")
    .min(3, "Nama lengkap terlalu pendek minimal 3 huruf")
    .max(100, "Nama lengkap terlalu panjang maksimal 55 huruf")
    .transform((fullname) => {
      return fullname
        .split(/\s+/)
        .map((part) => {
          return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        })
        .join(" ");
    }),
  email: zod
    .string()
    .trim()
    .min(1, "Email harus diisi")
    .email("Format email yang digunakan tidak valid")
    .toLowerCase()
    .max(254, "Email yang digunakan telalu panjang atau tidak valid"),
  password: zod
    .string()
    .min(8, "Kata sandi minimal 8 karakter")
    .max(64, "Kata sandi maksimal 64 karakter")
    .regex(/[a-z]/, "Wajib mengandung minimal 1 huruf kecil")
    .regex(/[A-Z]/, "Wajib mengandung minimal 1 huruf besar")
    .regex(/[0-9]/, "Wajib mengandung minimal 1 angka")
    .regex(/[\W_]/, "Wajib mengandung minimal 1 simbol"),
});

export default register;
