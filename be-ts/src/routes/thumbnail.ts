import { Router, Request, Response } from "express";
import ogs from "open-graph-scraper";

export function createThumbnailRouter(): Router {
  const router = Router();

  router.post(
    "/thumbnail",
    async (req: Request, res: Response): Promise<void> => {
      try {
        const { result } = await ogs({ url: req.body.url });
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "サムネイルの取得に失敗しました" });
      }
    },
  );

  return router;
}
