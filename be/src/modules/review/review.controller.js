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

  const getByCountryGuest = async (req, res) => {
    const country = req.params.countryName;
    try {
      const result = await service.getByCountryGuest(country);

      if (result.ok) {
        res.status(200).json({ data: result.data });
      } else {
        res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const post = async (req, res) => {
    try {
      const userId = req.user.uid;
      const review = req.body.review;
      const country = req.params.countryName;

      const result = await service.post(userId, review, country);

      if (result.ok) {
        res.status(201).json({ data: result.data });
      } else {
        res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  return { getAll, getByCountry, getByCountryGuest, post };
}

module.exports = { createReviewController };
