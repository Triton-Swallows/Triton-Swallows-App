function createReviewSummaryService(repository) {
  const getSummary = async (userId) => {
    try {
      const data = await repository.getSummary(userId);
      return { ok: true, data };
    } catch (error) {
      return { ok: false, status: 500, message: error.message };
    }
  };

  return { getSummary };
}

module.exports = { createReviewSummaryService };
