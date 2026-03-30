import type { Knex } from "knex";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("countries", function (table) {
    table.increments("id").primary();
    table.text("name").notNullable();
    table.text("name_en").notNullable();
    table.boolean("available");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("countries");
}
