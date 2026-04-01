import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("points", function (table) {
    table.increments("id").primary();
    table.string("user_id").notNullable();
    table.integer("bounus_point").notNullable().defaultTo(0);
    table.integer("consume_point").notNullable().defaultTo(0);
    table.integer("total_point").notNullable().defaultTo(0);
    table.timestamps(true, true);
    table.foreign("user_id").references("users.uid").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("points");
}
