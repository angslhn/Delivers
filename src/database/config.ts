import env from "@/config/env";

import type { PoolOptions } from "mysql2/promise";

const { dbHost, dbPort, dbName, dbUser, dbPassword } = env();

const dbConfig: PoolOptions = {
  host: dbHost,
  port: dbPort,
  database: dbName,
  user: dbUser,
  password: dbPassword,
  waitForConnections: true,
  timezone: "+00:00",
  connectionLimit: 10,
  queueLimit: 0,
};

export default dbConfig;
