const config = require("../knexfile");

let currentConfig;
if (process.env.NODE_ENV === "production") {
  currentConfig = config.production;
} else {
  currentConfig = config.development;
}
const knex = require("knex")(currentConfig);

module.exports = knex;
