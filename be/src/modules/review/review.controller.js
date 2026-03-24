function createReviewController(service) {
  const getAll = async (req, res) => {
    try {
      const result = await service.getAll();

      if (result.ok) {
        res.status(200).json({ data: result.data });
      } else {
        res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  return { getAll };
}

module.exports = { createReviewController };
