import mysql, { Pool } from "mysql2/promise";
import dbConfig from "@/database/config";

let pool: Pool;

declare global {
  var mysqlPool: Pool | undefined;
}

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  pool = mysql.createPool(dbConfig);
} else {
  if (!global.mysqlPool) {
    global.mysqlPool = mysql.createPool(dbConfig);
  }

  pool = global.mysqlPool;
}

export async function query<T>(sql: string, values: any[]) {
  const [rows] = await pool.execute(sql, values);

  return rows as T;
}
