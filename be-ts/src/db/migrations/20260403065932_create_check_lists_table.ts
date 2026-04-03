import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("check_lists", function (table) {
    table.increments("id").primary();
    table.string("user_id").notNullable();
    table.string("title").notNullable();
    table.boolean("is_favorite").notNullable();
    table.timestamps(true, true);
    table.foreign("user_id").references("users.uid").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("check_lists");
}
