import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("country_cheers", function (table) {
    table.string("user_id").notNullable();
    table.foreign("user_id").references("users.uid").onDelete("CASCADE");
    table.integer("country_id").notNullable();
    table.foreign("country_id").references("countries.id").onDelete("CASCADE");
    table.unique(["user_id", "country_id"]);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("country_cheers");
}
