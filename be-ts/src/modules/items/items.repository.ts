import { Knex } from "knex";
import { Item, ItemCopy } from "../../types/items";

export interface ItemRepository {
  checkItem: (check_list_id: string) => Promise<Item>;
  createItem: (user_id: string, title: string) => Promise<Item>;
  getItem: (user_id: string) => Promise<Item[]>;
  editItem: (id: string, title: string) => Promise<Item>;
  deleteItem: (id: string) => Promise<Item>;
  editItemStatus: (id: string, title: string) => Promise<Item>;
  getItemWithId: (id: string) => Promise<Item>;
  getItemCopy: (id: string) => Promise<ItemCopy>;
}

export const createItemRepository = (db: Knex): ItemRepository => {
  const checkItem = async (check_list_id: string): Promise<Item> => {
    return await db("items").where({ check_list_id }).first();
  };

  const createItem = async (
    check_list_id: string,
    item: string,
  ): Promise<Item> => {
    const result = await db("items")
      .insert({ check_list_id, item })
      .returning("*");
    return result[0];
  };

  const getItem = async (check_list_id: string): Promise<Item[]> => {
    return await db("items")
      .where({
        check_list_id,
      })
      .select("*")
      .orderBy("id", "asc");
  };

  const editItem = async (id: string, item: string): Promise<Item> => {
    const result = await db("items")
      .where({ id })
      .update({
        item,
        updated_at: db.fn.now(),
      })
      .returning("*");
    return result[0];
  };

  const deleteItem = async (id: string) => {
    const result = await db("items").where({ id }).del().returning("*");
    return result[0];
  };

  const editItemStatus = async (id: string, status: string): Promise<Item> => {
    const result = await db("items")
      .where({ id })
      .update({
        status,
        updated_at: db.fn.now(),
      })
      .returning("*");
    return result[0];
  };

  const getItemWithId = async (id: string): Promise<Item> => {
    return await db("items").where({ id }).first("*");
  };

  const getItemCopy = async (id: string): Promise<ItemCopy> => {
    return await db("items")
      .leftJoin("check_lists", "items.check_list_id", "check_lists.id")
      .where("items.id", id)
      .select("items.*", "check_lists.title")
      .first();
  };

  return {
    checkItem,
    createItem,
    getItem,
    editItem,
    deleteItem,
    editItemStatus,
    getItemWithId,
    getItemCopy,
  };
};
