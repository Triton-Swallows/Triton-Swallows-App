import { Knex } from "knex";
import { User } from "../../types/user";

export interface UserRepository {
  findByUid: (uid: string) => Promise<User>;
  upsert: (uid: string, email: string) => Promise<User>;
}

export const createUserRepository = (
  knex: Knex,
  table: string = "users",
): UserRepository => {
  // uidで検索
  const findByUid = async (uid: string): Promise<User> => {
    return await knex(table).where({ uid }).first();
  };

  // uidが存在しなければ作成（既存ユーザーは更新しない）
  const upsert = async (uid: string, email: string): Promise<User> => {
    const existing = await findByUid(uid);
    if (!existing) {
      await knex(table).insert({ uid, email });
    }
    return await findByUid(uid);
  };

  return { findByUid, upsert };
};
