import type { Env } from "@/types/app";

export default function env(): Env {
  return {
    cookieName: process.env.COOKIE_NAME,
  };
}
