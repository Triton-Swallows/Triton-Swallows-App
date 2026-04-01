import type { Knex } from "knex";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("reviews", function (table) {
    table.increments("id").primary();
    table.string("user_id").notNullable();
    table.foreign("user_id").references("users.uid");
    table.text("review").notNullable();
    table.string("country_name");
    table.integer("liked_count").notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("reviews");
}
