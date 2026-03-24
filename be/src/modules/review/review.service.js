function createReviewService(repository) {
  const getAll = async (userId) => {
    try {
      const data = await repository.getAll(userId);
      return { ok: true, data };
    } catch (error) {
      return { ok: false, status: 500, message: error.message };
    }
  };

  return { getAll };
}

module.exports = { createReviewService };
