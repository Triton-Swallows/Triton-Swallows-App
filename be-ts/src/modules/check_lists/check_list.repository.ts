import { Knex } from "knex";
import { CheckLists } from "../../types/check_list";

export interface CheckListRepository {
  checkUser: (user_id: string) => Promise<CheckLists>;
  createCheckLists: (user_id: string, title: string) => Promise<CheckLists>;
  getChecklist: (user_id: string) => Promise<CheckLists[]>;
  editCheckList: (id: string, title: string) => Promise<CheckLists>;
  deleteCheckList: (id: string) => Promise<CheckLists>;
  getAllChecklist: (user_id: string) => Promise<CheckLists[]>;
}

export const createCheckListRepository = (db: Knex): CheckListRepository => {
  const checkUser = async (user_id: string): Promise<CheckLists> => {
    return await db("check_lists").where({ user_id }).first();
  };

  const createCheckLists = async (
    user_id: string,
    title: string,
  ): Promise<CheckLists> => {
    const result = await db("check_lists")
      .insert({ user_id, title })
      .returning("*");
    return result[0];
  };

  const getChecklist = async (user_id: string): Promise<CheckLists[]> => {
    return await db("check_lists")
      .where({
        user_id,
      })
      .select("*")
      .orderBy("created_at", "desc");
  };

  const editCheckList = async (
    id: string,
    title: string,
  ): Promise<CheckLists> => {
    const result = await db("check_lists")
      .where({ id })
      .update({
        title,
        updated_at: db.fn.now(),
      })
      .returning("*");
    return result[0];
  };

  const deleteCheckList = async (id: string) => {
    const result = await db("check_lists").where({ id }).del().returning("*");
    return result[0];
  };

  const getAllChecklist = async (user_id: string): Promise<CheckLists[]> => {
    return await db("check_lists")
      .whereNot({
        user_id,
      })
      .select("*")
      .orderBy("created_at", "desc");
  };

  return {
    checkUser,
    createCheckLists,
    getChecklist,
    editCheckList,
    deleteCheckList,
    getAllChecklist,
  };
};
