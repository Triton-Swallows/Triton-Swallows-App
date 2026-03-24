/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("reviews", function (table) {
    table.increments("id").primary();
    table.string("user_id").notNullable();
    table.foreign("user_id").references("users.uid");
    table.text("review").notNullable();
    table.timestamp(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("reviewx");
};
