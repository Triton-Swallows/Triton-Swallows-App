import { Request, Response } from "express";
import { UserService } from "./user.service";

export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email: string;
  };
}

export interface UserController {
  getMe: (req: AuthRequest, res: Response) => Promise<void>;
  upsert: (req: AuthRequest, res: Response) => Promise<void>;
}

export const createUserController = (service: UserService): UserController => {
  // 認証ユーザーの情報取得
  const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const uid = req.user!.uid;
      const user = await service.findByUid(uid);

      if (!user) {
        res.status(404).json({ error: "ユーザが見つかりませんでした" });
        return;
      }

      res.status(200).json({ data: user });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  };

  // ユーザー登録/更新
  const upsert = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const uid = req.user!.uid;
      const email = req.user!.email;

      const result = await service.upsert(uid, email);

      if (result.ok) {
        res.status(201).json({ data: result.data });
      } else {
        res.status(500).json({ error: result.message });
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  };

  return { getMe, upsert };
};
