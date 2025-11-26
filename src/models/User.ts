import id from "@/helpers/id";
import { query } from "@/libs/mysql";

import type { ResultSetHeader } from "mysql2";
import type { CreateUser, UserDataPacket } from "@/types/app";

export const User = {
  findById: async (id: number): Promise<UserDataPacket | null> => {
    const users = await query<UserDataPacket[]>("SELECT * FROM users WHERE id = ?", [id]);

    return users[0] || null;
  },

  findByEmail: async (email: string): Promise<UserDataPacket | null> => {
    const users = await query<UserDataPacket[]>("SELECT * FROM users WHERE email = ?", [email]);

    return users[0] || null;
  },

  create: async (data: CreateUser): Promise<number> => {
    const userId = id();

    const { fullname, email, password } = data;

    await query<ResultSetHeader>("INSERT INTO users (id, fullname, email, password) VALUES (?, ?, ?, ?)", [userId, fullname, email, password]);

    return userId;
  },
};
