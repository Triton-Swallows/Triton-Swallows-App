import { Request, Response } from "express";
import { ReviewService } from "./review.service";

/**
 * ログイン済みユーザー用のリクエスト型を定義
 */
export interface AuthRequest extends Request {
  user?: {
    uid: string;
  };
}

/**
 * controllerが持つメソッドの型を定義。
 */
export interface ReviewController {
  getAll: (req: AuthRequest, res: Response) => Promise<void>;
  getByCountry: (req: AuthRequest, res: Response) => Promise<void>;
  getByCountryGuest: (req: Request, res: Response) => Promise<void>; // GuestはAuthRequestでなくても良いかもしれません
  post: (req: AuthRequest, res: Response) => Promise<void>;
}

/**
 *実際のメイン関数
 */

function createReviewController(service: ReviewService): ReviewController {
  const getAll = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user!.uid;
    try {
      const result = await service.getAll(userId);

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

  const getByCountry = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.uid;
    const country = String(req.params.countryName);
    if (!country) {
      res.status(400).json({ error: "countryNameが必要です。" });
      return;
    }

    try {
      const result = await service.getByCountry(userId, country);

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

  const getByCountryGuest = async (req: Request, res: Response) => {
    // countryがundefinedやstring[]にならないように(例：?country=japan&country=usa)
    const country = String(req.params.countryName);
    if (!country) {
      res.status(400).json({ error: "countryNameが必要です。" });
      return;
    }

    try {
      const result = await service.getByCountryGuest(country);

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

  const post = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.uid;
      const review = req.body.review;

      const country = String(req.params.countryName);
      if (!country) {
        res.status(400).json({ error: "countryNameが必要です。" });
        return;
      }
      const result = await service.post(userId, review, country);

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

  return { getAll, getByCountry, getByCountryGuest, post };
}

export { createReviewController };
