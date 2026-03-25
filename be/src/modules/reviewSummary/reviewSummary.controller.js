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

  return { getSummary };
}

module.exports = { createReviewSummaryController };
