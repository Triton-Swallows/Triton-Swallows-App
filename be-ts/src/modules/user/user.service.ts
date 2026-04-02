import { UserRepository } from "./user.repository";
import { User, UserServiceResponse, MyInfo } from "../../types/user";

export interface UserService {
  findByUid: (userId: string) => Promise<UserServiceResponse<User>>;
  upsert: (userId: string, email: string) => Promise<UserServiceResponse<User>>;
  getMyInfo: (userId: string) => Promise<UserServiceResponse<MyInfo>>;
  editMyInfo: (
    user_id: string,
    user_name: string,
    icon_url: string,
  ) => Promise<UserServiceResponse<User>>;
}

export const createUserService = (repository: UserRepository): UserService => {
  const findByUid = async (uid: string): Promise<UserServiceResponse<User>> => {
    if (!uid) {
      return {
        ok: false,
        status: 400,
        message: "uidが不足しています",
      };
    }
    const user = await repository.getUserByUid(uid);
    return { ok: true, data: user };
  };

  const upsert = async (
    uid: string,
    email: string,
  ): Promise<UserServiceResponse<User>> => {
    if (!uid || !email) {
      return {
        ok: false,
        status: 400,
        message: "uid/emailのいずれかが不足しています",
      };
    }
    const user = await repository.upsert(uid, email);
    return { ok: true, data: user };
  };

  const getMyInfo = async (
    uid: string,
  ): Promise<UserServiceResponse<MyInfo>> => {
    try {
      const [user, review_count, like_count, point, approved_count] =
        await Promise.all([
          repository.getUserByUid(uid),
          repository.getReviewCountByUserId(uid),
          repository.getLikeCountByUserId(uid),
          repository.getTotalPointByUserId(uid),
          repository.getApprovedCountByUserId(uid),
        ]);

      if (!user) {
        return { ok: false, status: 404, message: "ユーザーが見つかりません" };
      }

      // 残高ポイントをここで取得(repositoryからどんな型で返ってくるかをチェック)

      const total_point =
        (like_count.total_like_count || 0) * 2 +
        (approved_count.total_approved_count || 0) * 10 +
        (point.bonus_point || 0);

      const myPoint = total_point - (point.consume_point || 0);

      const result: MyInfo = {
        ...user,
        ...review_count,
        ...like_count,
        ...point,
        ...approved_count,
        total_point: total_point,
        my_point: myPoint,
      };

      return { ok: true, data: result };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  const editMyInfo = async (
    user_id: string,
    user_name: string,
    icon_url: string,
  ): Promise<UserServiceResponse<User>> => {
    try {
      const updatededUser = await repository.editMyInfo(
        user_id,
        user_name,
        icon_url,
      );
      return { ok: true, data: updatededUser };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  return { findByUid, upsert, getMyInfo, editMyInfo };
};
