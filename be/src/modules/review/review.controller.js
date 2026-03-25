function createReviewController(service) {
  const getAll = async (req, res) => {
    const userId = req.user.uid;
    try {
      const result = await service.getAll(userId);

      if (result.ok) {
        res.status(200).json({ data: result.data });
      } else {
        res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getByCountry = async (req, res) => {
    const country = req.params.countryName;
    const userId = req.user.uid;
    try {
      const result = await service.getByCountry(userId, country);

      if (result.ok) {
        res.status(200).json({ data: result.data });
      } else {
        res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  return { getAll, getByCountry };
}

module.exports = { createReviewController };
