// Update with your config settings.
import { Knex } from "knex";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const DB_USER: string = process.env.DB_USER || "";
const DB_NAME: string = process.env.DB_NAME || "";
const DB_HOST: string = "127.0.0.1";
const DB_PORT: number = 5432;
const DB_PASSWORD: string = process.env.DB_PASSWORD || "";
const DB_URL: string = process.env.DB_URL || ""; // heroku上だけの環境変数

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      host: DB_HOST || "127.0.0.1",
      port: DB_PORT || 5432,
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
    },
    migrations: {
      directory: "./db/migrations",
      extension: "ts",
    },
    seeds: {
      directory: "./db/seeds",
      extension: "ts",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      connectionString: DB_URL,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: ".src/db/migrations",
    },
    seeds: {
      directory: ".src/db/seeds",
    },
  },
};

export default config;
