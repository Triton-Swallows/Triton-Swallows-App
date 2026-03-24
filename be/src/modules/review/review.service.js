function createReviewService(repository) {
  const getAll = async () => {
    try {
      const data = await repository.getAll();
      return { ok: true, data };
    } catch (error) {
      return { ok: false, status: 500, message: error.message };
    }
  };

  return { getAll };
}

module.exports = { createReviewService };
