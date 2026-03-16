const express = require("express");
const path = require("path");

function buildApp() {
  const app = express();

  // publicフォルダの中のファイルをそのままwebで見られるようにする設定
  app.use(express.static(path.join(__dirname, "/public")));

  app.use(express.json());

  return app;
}

module.exports = { buildApp };
