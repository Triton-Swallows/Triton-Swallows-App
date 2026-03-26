const express = require("express");
const ogs = require("open-graph-scraper");

function createThumbnailRouter() {
  const router = express.Router();

  router.post("/thumbnail", async (req, res) => {
    try {
      const { result } = await ogs({ url: req.body.url });
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "サムネイルの取得に失敗しました" });
    }
  });

  return router;
}

module.exports = { createThumbnailRouter };
