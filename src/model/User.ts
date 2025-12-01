import { query } from "@/libs/mysql";

import type { ResultSetHeader } from "mysql2";
import type { UserCreate, UserData, UserDataPacket } from "@/types/global";

export const User = {
  findById: async (id: number): Promise<UserDataPacket | null> => {
    const users = await query<UserDataPacket[]>("SELECT * FROM users WHERE id = ?", [id]);

    return users[0] || null;
  },

  findByEmail: async (email: string): Promise<UserDataPacket | null> => {
    const users = await query<UserDataPacket[]>("SELECT * FROM users WHERE email = ?", [email]);

    return users[0] || null;
  },

  create: async (data: UserCreate): Promise<number> => {
    const columns = Object.keys(data);
    const values = Object.values(data);

    const placeholders = Array(columns.length).fill("?").join(",");

    const sql = "INSERT INTO users (" + columns.join(",") + ") VALUES (" + placeholders + ")";

    await query<ResultSetHeader>(sql, values);

    return values[0];
  },
};
