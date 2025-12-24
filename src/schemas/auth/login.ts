import zod from "zod";

const login = zod.object({
  email: zod
    .string()
    .trim()
    .min(1, "Email harus diisi")
    .email("Format email yang digunakan tidak valid")
    .toLowerCase()
    .max(254, "Email yang digunakan telalu panjang atau tidak valid"),
  password: zod.string().min(1, "Kata sandi harus diisi").max(64, "Kata sandi melebihi panjang yang ditentukan"),
});

export default login;
