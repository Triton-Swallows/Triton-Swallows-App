function createReviewSummaryController(service) {
  const getSummary = async (req, res) => {
    const userId = req.user.uid;
    const country = req.params.countryName;
    try {
      const result = await service.getSummary(userId, country);

      if (result.ok) {
        res.status(200).json({ data: result.data });
      } else {
        res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const postLike = async (req, res) => {
    const userId = req.user.uid;
    const { summary_id } = req.body;
    try {
      const result = await service.postLike(userId, summary_id);

      if (result.ok) {
        res.status(200).json({ data: result.data });
      } else {
        res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const deleteLike = async (req, res) => {
    const userId = req.user.uid;
    const summary_id = req.params.summary_id;
    try {
      const result = await service.deleteLike(userId, summary_id);

      if (result.ok) {
        res.status(200).json({ data: result.data });
      } else {
        res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  return { getSummary, postLike, deleteLike };
}

module.exports = { createReviewSummaryController };
