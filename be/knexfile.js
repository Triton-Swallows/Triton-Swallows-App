require("dotenv").config({ path: "./.env" });

const DB_USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = "127.0.0.1";
const DB_PORT = "5432";
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_URL = process.env.DB_URL; // heroku上だけの環境変数
const DB_SSL = process.env.DB_SSL; // heroku上だけの環境変数

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: DB_HOST || "127.0.0.1",
      port: DB_PORT || "5432",
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },

  production: {
    client: "postgresql",
    connection: DB_URL,
    ssl: DB_SSL ? { rejectUnauthorized: false } : false,
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
