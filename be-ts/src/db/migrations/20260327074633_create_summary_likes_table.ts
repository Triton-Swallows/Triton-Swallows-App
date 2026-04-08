import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("summary_likes", function (table) {
    table.string("user_id").notNullable();
    table.integer("summary_id").notNullable();
    table.timestamps(true, true);
    table.foreign("user_id").references("users.uid").onDelete("CASCADE");
    table.foreign("summary_id").references("summaries.id").onDelete("CASCADE");
    table.unique(["user_id", "summary_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("summary_likes");
}
