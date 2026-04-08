function createReviewService(repository) {
  const getAll = async (userId) => {
    try {
      const reviews = await repository.getAll(userId);
      const data = reviews.map((review) => ({
        ...review,
        liked_by_me: Boolean(review.liked_by_me),
      }));
      return { ok: true, data };
    } catch (error) {
      return { ok: false, status: 500, message: error.message };
    }
  };

  const getByCountry = async (userId, country) => {
    try {
      const reviews = await repository.getByCountry(userId, country);
      const data = reviews.map((review) => ({
        ...review,
        liked_by_me: Boolean(Number(review.liked_by_me)),
      }));
      return { ok: true, data };
    } catch (error) {
      return { ok: false, status: 500, message: error.message };
    }
  };

  const getByCountryGuest = async (country) => {
    try {
      const data = await repository.getByCountryGuest(country);
      return { ok: true, data };
    } catch (error) {
      return { ok: false, status: 500, message: error.message };
    }
  };

  const post = async (userId, review, country) => {
    try {
      const data = await repository.post(userId, review, country);
      return { ok: true, data };
    } catch (error) {
      return { ok: false, status: 500, message: error.message };
    }
  };

  return { getAll, getByCountry, getByCountryGuest, post };
}

module.exports = { createReviewService };
