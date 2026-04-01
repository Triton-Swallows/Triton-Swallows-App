import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", function (table) {
    table.string("uid").primary(); // firebaseuidが主キー
    table.string("user_name", 32).notNullable().defaultTo("名称未設定");
    table.string("email", 255).unique().notNullable();
    table.text("icon_url");
    table.boolean("is_admin").notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
