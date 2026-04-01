import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("contacts", function (table) {
    table.increments("id").primary();
    table.string("user_id").notNullable();
    table.foreign("user_id").references("users.uid").onDelete("CASCADE");
    table.string("email", 255).notNullable();
    table.foreign("email").references("users.email").onDelete("CASCADE");
    table.string("target").notNullable();
    table.text("description").notNullable();
    table.text("others");
    table.boolean("is_checked").notNullable().defaultTo(false);
    table.boolean("is_accepted").notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("contacts");
}
