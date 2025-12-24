import zod from "zod";

const verifyEmail = zod.object({
  token: zod
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9]{64}$/, "Token untuk verifikasi masuk pengguna tidak valid."),
  otp: zod
    .string()
    .trim()
    .regex(/^[0-9]{6}$/, "Kode OTP untuk verifikasi masuk pengguna tidak valid."),
});

export default verifyEmail;
