function createLikeController(service) {
  // reviewsへのいいねの登録
  const post = async (req, res) => {
    try {
      const user_id = req.user.uid;
      const review_id = req.body.review_id;

      const result = await service.post(user_id, review_id);

      if (result.ok) {
        res.status(201).json({ data: result.data });
      } else {
        res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const del = async (req, res) => {
    try {
      const user_id = req.user.uid;
      const review_id = req.params.reviewId;

      const result = await service.del(user_id, review_id);

      if (result.ok) {
        res.status(200).json({ data: result.data });
      } else {
        res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  return { post, del };
}

module.exports = { createLikeController };
