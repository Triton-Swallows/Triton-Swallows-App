import { Request, Response } from "express";
import { ReviewSummaryService } from "./reviewSummary.service";

export interface AuthRequest extends Request {
  user?: {
    uid: string;
  };
}

export interface ReviewSummaryController {
  getSummary: (req: AuthRequest, res: Response) => Promise<void>;
  getSummaryGuest: (req: Request, res: Response) => Promise<void>;
  postLike: (req: AuthRequest, res: Response) => Promise<void>;
  deleteLike: (req: AuthRequest, res: Response) => Promise<void>;
}

export const createReviewSummaryController = (
  service: ReviewSummaryService,
) => {
  const getSummary = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.uid;
    const country = req.params.countryName;
    // 型ガード: countryName が文字列であることを保証
    if (typeof country !== "string") {
      res.status(400).json({ error: "Invalid country name" });
      return;
    }
    try {
      const result = await service.getSummary(userId, country);
      if (result.ok) {
        res.status(200).json({ data: result.data });
      } else {
        res.status(result.status || 500).json({ error: result.message });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  const getSummaryGuest = async (req: Request, res: Response) => {
    const country = req.params.countryName;
    // 型ガード: countryName が文字列であることを保証
    if (typeof country !== "string") {
      res.status(400).json({ error: "Invalid country name" });
      return;
    }
    try {
      const result = await service.getSummaryGuest(country);
      if (result.ok) {
        res.status(200).json({ data: result.data });
      } else {
        res.status(result.status || 500).json({ error: result.message });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  const postLike = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.uid;
    const { summary_id } = req.body;
    try {
      const result = await service.postLike(userId, summary_id);
      if (result.ok) {
        res.status(200).json({ data: result.data });
      } else {
        res.status(result.status || 500).json({ error: result.message });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  const deleteLike = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.uid;
    const summary_id = req.params.summary_id;
    // 型ガード: countryName が文字列であることを保証
    if (typeof summary_id !== "string") {
      res.status(400).json({ error: "Invalid country name" });
      return;
    }
    try {
      const result = await service.deleteLike(userId, summary_id);
      if (result.ok) {
        res.status(200).json({ data: result.data });
      } else {
        res.status(result.status || 500).json({ error: result.message });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  return { getSummary, getSummaryGuest, postLike, deleteLike };
};
