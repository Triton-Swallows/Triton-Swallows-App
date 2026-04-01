import { Knex } from "knex";
import {
  User,
  ReviewCountType,
  PointCountType,
  LikeCountType,
} from "../../types/user";

export interface UserRepository {
  getAllUsers: () => Promise<User[]>;
  getUserByUid: (uid: string) => Promise<User>;
  upsert: (uid: string, email: string) => Promise<User>;
  getReviewCountByUserId: (uid: string) => Promise<ReviewCountType>;
  getTotalPointByUserId: (uid: string) => Promise<PointCountType>;
  getLikeCountByUserId: (userId: string) => Promise<LikeCountType>;
  editMyInfo: (
    user_id: string,
    user_name: string,
    icon_url: string,
  ) => Promise<User>;
}

export const createUserRepository = (db: Knex): UserRepository => {
  // 全ユーザーを取得
  const getAllUsers = async (): Promise<User[]> => {
    return await db("users").select("*");
  };

  // uidに一致するユーザーをuserテーブルから取得
  const getUserByUid = async (uid: string): Promise<User> => {
    return await db("users")
      .where({ uid })
      .select("uid", "email", "user_name", "icon_url")
      .first();
  };

  // uidが存在しなければ作成（既存ユーザーは更新しない）
  const upsert = async (uid: string, email: string): Promise<User> => {
    const existing = await getUserByUid(uid);
    if (!existing) {
      await db("users").insert({ uid, email });
    }
    return await getUserByUid(uid);
  };

  // user_idに基づく累計投稿数をget
  const getReviewCountByUserId = async (
    uid: string,
  ): Promise<ReviewCountType> => {
    const result = db("reviews")
      .where("reviews.user_id", uid)
      .count("*")
      .as("review_count")
      .first() as unknown as ReviewCountType;
    return result ?? { review_count: 0 };
  };

  // user_idに基づく累計ポイント数をget
  const getTotalPointByUserId = async (
    uid: string,
  ): Promise<PointCountType> => {
    return await db("points")
      .where("points.user_id", uid)
      .select("total_point")
      .first();
  };

  // ユーザごとのtotal_like_count集計
  const getLikeCountByUserId = async (uid: string): Promise<LikeCountType> => {
    return await db("users")
      .leftJoin("reviews", "users.uid", "reviews.user_id")
      .where("users.uid", uid)
      .groupBy("users.uid")
      .select(
        db.raw(
          "COALESCE(SUM(reviews.liked_count), 0)::integer as total_like_count",
        ),
      )
      .first();
  };

  // プロフィールの編集（user_nameとicon_urlが対象）
  const editMyInfo = async (
    uid: string,
    user_name: string,
    icon_url: string,
  ): Promise<User> => {
    const results = await db("users")
      .where({ uid })
      .update({
        user_name,
        icon_url,
      })
      .returning("*");

    return results[0];
  };

  return {
    getAllUsers,
    getUserByUid,
    upsert,
    getLikeCountByUserId,
    getReviewCountByUserId,
    getTotalPointByUserId,
    editMyInfo,
  };
};
