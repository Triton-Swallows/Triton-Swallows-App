import { UserRepository } from "./user.repository";
import { User, UserServiceResponse } from "../../types/user";

export interface UserService {
  findByUid: (userId: string) => Promise<UserServiceResponse<User>>;
  upsert: (userId: string, email: string) => Promise<UserServiceResponse<User>>;
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
    const user = await repository.findByUid(uid);
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

  return { findByUid, upsert };
};
