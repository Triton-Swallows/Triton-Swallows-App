import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("likes", function (table) {
    table.string("user_id").notNullable();
    table.foreign("user_id").references("users.uid").onDelete("CASCADE");
    table.integer("review_id").notNullable();
    table.foreign("review_id").references("reviews.id").onDelete("CASCADE");
    table.unique(["user_id", "review_id"]);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("likes");
}
