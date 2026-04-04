import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("items", function (table) {
    table.increments("id").primary();
    table.integer("check_list_id").notNullable();
    table.string("item").notNullable();
    table.integer("status").notNullable().defaultTo(0);
    table.string("category").notNullable();
    table.timestamps(true, true);
    table
      .foreign("check_list_id")
      .references("check_lists.id")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("items");
}
