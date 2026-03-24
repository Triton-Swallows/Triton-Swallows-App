/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("likes", function (table) {
    table.string("user_id").notNullable();
    table.foreign("user_id").references("users.uid").onDelete("CASCADE");
    table.integer("review_id").notNullable();
    table.foreign("review_id").references("reviews.id").onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("likes");
};
