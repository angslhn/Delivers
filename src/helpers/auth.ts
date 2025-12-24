import env from "@/config/env";
import { UserPayload } from "@/types/global";
import { jwtVerify } from "jose";

export async function verifyToken(token: string): Promise<UserPayload | null> {
  const { jwtSecure } = env();

  try {
    if (!jwtSecure) {
      throw new Error("Kunci rahasia untuk verifikasi JWT tidak tersedia!");
    }

    const key = new TextEncoder().encode(jwtSecure);

    const { payload } = await jwtVerify(token, key);

    return payload as unknown as UserPayload;
  } catch (error) {
    return null;
  }
}
