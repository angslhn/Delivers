import zod from "zod";

const verifyLogin = zod.object({
  token: zod
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9]{64}$/, "Token untuk verifikasi email pengguna tidak valid."),
  otp: zod
    .string()
    .trim()
    .regex(/^[0-9]{6}$/, "Kode OTP untuk verifikasi email pengguna tidak valid."),
});

export default verifyLogin;
