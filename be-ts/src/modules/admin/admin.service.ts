import { AdminRepository } from "./admin.repository";
import {
  AdminServiceResponse,
  Info,
  Points,
  Contacts,
} from "../../types/admin";

export interface AdminService {
  getAllUserInfo: () => Promise<AdminServiceResponse<Info[]>>;
  editPoints: (
    user_id: string,
    bonus_point: string,
    consume_point: string,
  ) => Promise<AdminServiceResponse<Points>>;
  getContacts: () => Promise<AdminServiceResponse<Contacts[]>>;
}

export const createAdminService = (
  repository: AdminRepository,
): AdminService => {
  const getAllUserInfo = async (): Promise<AdminServiceResponse<Info[]>> => {
    try {
      // 全ユーザーを取得
      const users = await repository.getAllUsers();
      const uids = users.map((u) => u.uid);
      // if (uids.length === 0) return [];

      // 統計情報を取得
      const [reviews, likes, contacts] = await Promise.all([
        repository.getReviewCounts(uids),
        repository.getLikeCounts(uids),
        repository.getAcceptedCounts(uids),
      ]);

      // Map化
      const reviewMap = new Map(
        reviews.map((r) => [r.user_id, Number(r.review_count)]),
      );
      const likeMap = new Map(
        likes.map((l) => [l.user_id, Number(l.total_like_count)]),
      );
      const contactMap = new Map(
        contacts.map((c) => [c.user_id, Number(c.contact_count)]),
      );

      // ユーザーデータに統計情報をマージ
      const data = users.map((user) => {
        const reviewCount = reviewMap.get(user.uid) ?? 0;
        const likeCount = likeMap.get(user.uid) ?? 0;
        const isAcceptedCount = contactMap.get(user.uid) ?? 0;
        const TotalPoint =
          likeCount * 2 + isAcceptedCount * 10 + user.bonus_point;
        const MyPoint =
          likeCount * 2 +
          isAcceptedCount * 10 +
          user.bonus_point -
          user.consume_point;

        return {
          ...user,
          review_count: reviewCount,
          total_like_count: likeCount,
          accepted_count: isAcceptedCount,
          total_point: TotalPoint,
          my_point: MyPoint,
        };
      });
      return { ok: true, data };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  const editPoints = async (
    user_id: string,
    bonus_point: string,
    consume_point: string,
  ): Promise<AdminServiceResponse<Points>> => {
    try {
      const updatededPoints = await repository.editPoints(
        user_id,
        bonus_point,
        consume_point,
      );
      return { ok: true, data: updatededPoints };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  const getContacts = async (): Promise<AdminServiceResponse<Contacts[]>> => {
    try {
      const data = await repository.getContacts();
      return { ok: true, data };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  return { getAllUserInfo, editPoints, getContacts };
};
