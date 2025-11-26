import type { Env } from "@/types/app";

export default function env(): Env {
  return {
    dbHost: process.env.DB_HOST,
    dbPort: Number(process.env.DB_PORT),
    dbUser: process.env.DB_USER,
    dbName: process.env.DB_NAME,
    dbPassword: process.env.DB_PASSWORD,
    cookieName: process.env.COOKIE_NAME,
  };
}
