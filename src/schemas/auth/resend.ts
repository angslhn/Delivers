import zod from "zod";

const resend = zod.object({
  token: zod
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9]{64}$/, "Token untuk verifikasi masuk pengguna tidak valid."),
});

export default resend;
