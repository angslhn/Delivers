import zod from "zod";

const forgotPassword = zod.object({
  email: zod.string().trim().min(1, "Email harus diisi").email("Format email yang digunakan tidak valid").toLowerCase(),
});

export default forgotPassword;
