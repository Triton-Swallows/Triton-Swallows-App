import { LikeService } from "./like.service";
import { Request, Response } from "express";

/**
 * ログイン済みユーザー用のリクエスト型を定義
 */
export interface AuthRequest extends Request {
  user?: {
    uid: string;
  };
}

export interface LikeController {
  post: (req: AuthRequest, res: Response) => Promise<void>;
  del: (req: AuthRequest, res: Response) => Promise<void>;
}

function createLikeController(service: LikeService) {
  // reviewsへのいいねの登録
  const post = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const user_id = req.user!.uid;
      const review_id = req.body.review_id;

      const result = await service.post(user_id, review_id);

      if (result.ok) {
        res.status(201).json({ data: result.data });
      } else {
        res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  };

  const del = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const user_id = req.user!.uid;
      const review_id = String(req.params.reviewId);

      const result = await service.del(user_id, review_id);

      if (result.ok) {
        res.status(200).json({ data: result.data });
      } else {
        res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  };

  return { post, del };
}

export { createLikeController };
