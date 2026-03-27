// const knex = require("knex");
// const knexConfig = require("./knexfile");
// module.exports = knex(knexConfig[process.env.NODE_ENV]);

import knex, { Knex } from "knex";
import config from "./knexfile";
// 実行環境（development, productionなど）を取得
// process.env.NODE_ENV が未定義の場合は 'development' をデフォルトにする
const environment: any = process.env.NODE_ENV || "development";

// 設定オブジェクトから現在の環境設定を抽出
const connectionConfig = config[environment];

if (!connectionConfig) {
  throw new Error(
    `Config for environment "${environment}" not found in knexfile.`,
  );
}

// Knexインスタンスの生成
const db = knex(connectionConfig);

export default db;
