import { Item, ItemServiceResponse } from "../../types/items";
import { ItemRepository } from "./items.repository";

export interface ItemService {
  getItem: (check_list_id: string) => Promise<ItemServiceResponse<Item[]>>;
  editItem: (id: string, title: string) => Promise<ItemServiceResponse<Item>>;
  deleteItem: (id: string) => Promise<ItemServiceResponse<Item>>;
  createItem: (
    user_id: string,
    title: string,
  ) => Promise<ItemServiceResponse<Item>>;
}

export const createItemService = (repository: ItemRepository): ItemService => {
  const getItem = async (
    check_list_id: string,
  ): Promise<ItemServiceResponse<Item[]>> => {
    try {
      const checkUser = await repository.checkItem(check_list_id);
      if (!checkUser) {
        await repository.createItem(check_list_id, "新しい持ち物");
      }
      const data = await repository.getItem(check_list_id);
      return { ok: true, data };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  const editItem = async (
    id: string,
    item: string,
  ): Promise<ItemServiceResponse<Item>> => {
    try {
      const data = await repository.editItem(id, item);
      return { ok: true, data };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  const deleteItem = async (id: string): Promise<ItemServiceResponse<Item>> => {
    try {
      const data = await repository.deleteItem(id);
      return { ok: true, data };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  const createItem = async (
    check_list_id: string,
    item: string,
  ): Promise<ItemServiceResponse<Item>> => {
    try {
      const data = await repository.createItem(check_list_id, item);
      return { ok: true, data };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  return { getItem, editItem, deleteItem, createItem };
};
