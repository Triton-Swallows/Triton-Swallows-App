import { CheckLists, CheckListsServiceResponse } from "../../types/check_list";
import { CheckListRepository } from "./check_list.repository";

export interface CheckListService {
  getCheckLists: (
    user_id: string,
  ) => Promise<CheckListsServiceResponse<CheckLists[]>>;
  editCheckList: (
    id: string,
    title: string,
  ) => Promise<CheckListsServiceResponse<CheckLists>>;
  deleteCheckList: (
    id: string,
  ) => Promise<CheckListsServiceResponse<CheckLists>>;
  createCheckList: (
    user_id: string,
    title: string,
  ) => Promise<CheckListsServiceResponse<CheckLists>>;
  getAllCheckLists: (
    user_id: string,
  ) => Promise<CheckListsServiceResponse<CheckLists[]>>;
  copyCheckList: (
    check_list_id: string,
    user_id: string,
  ) => Promise<CheckListsServiceResponse<CheckLists>>;
}

export const createCheckListService = (
  repository: CheckListRepository,
): CheckListService => {
  const getCheckLists = async (
    user_id: string,
  ): Promise<CheckListsServiceResponse<CheckLists[]>> => {
    try {
      const checkUser = await repository.checkUser(user_id);
      if (!checkUser) {
        await repository.createCheckLists(user_id, "新しいリスト");
      }
      const data = await repository.getChecklist(user_id);
      return { ok: true, data };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  const editCheckList = async (
    id: string,
    title: string,
  ): Promise<CheckListsServiceResponse<CheckLists>> => {
    try {
      const data = await repository.editCheckList(id, title);
      return { ok: true, data };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  const deleteCheckList = async (
    id: string,
  ): Promise<CheckListsServiceResponse<CheckLists>> => {
    try {
      const data = await repository.deleteCheckList(id);
      return { ok: true, data };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  const createCheckList = async (
    user_id: string,
    title: string,
  ): Promise<CheckListsServiceResponse<CheckLists>> => {
    try {
      const data = await repository.createCheckLists(user_id, title);
      return { ok: true, data };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  const getAllCheckLists = async (
    user_id: string,
  ): Promise<CheckListsServiceResponse<CheckLists[]>> => {
    try {
      const data = await repository.getAllChecklist(user_id);
      return { ok: true, data };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  const copyCheckList = async (
    id: string,
    user_id: string,
  ): Promise<CheckListsServiceResponse<CheckLists>> => {
    try {
      const data = await repository.getChecklistWithId(id);
      const checklist = await repository.createCheckLists(user_id, data.title);
      const itemNameLists = await repository.getItem(id);
      const items = itemNameLists.map((itemNameList) => ({
        check_list_id: checklist.id,
        item: itemNameList.item,
      }));
      await repository.createItem(items);
      return { ok: true, data: checklist };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  return {
    getCheckLists,
    editCheckList,
    deleteCheckList,
    createCheckList,
    getAllCheckLists,
    copyCheckList,
  };
};
