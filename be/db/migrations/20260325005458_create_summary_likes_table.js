/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("summary_likes", function (table) {
    table.string("user_id").notNullable();
    table.integer("summary_id").notNullable();
    table.timestamps(true, true);
    table.foreign("user_id").references("users.uid").onDelete("CASCADE");
    table.foreign("summary_id").references("summaries.id").onDelete("CASCADE");
    table.unique(["user_id", "summary_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("summary_likes");
};
