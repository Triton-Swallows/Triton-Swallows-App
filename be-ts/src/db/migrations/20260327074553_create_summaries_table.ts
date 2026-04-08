import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("summaries", function (table) {
    table.increments("id").primary();
    table.text("summary").notNullable();
    table.string("country_name");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("summaries");
}
