function createReviewSummaryService(repository) {
  const getSummary = async (userId, country) => {
    try {
      const summaries = await repository.getSummary(userId, country);
      const data = summaries.map((summary) => ({
        ...summary,
        liked_by_me: !!summary.liked_by_me,
      }));
      return { ok: true, data };
    } catch (error) {
      return { ok: false, status: 500, message: error.message };
    }
  };

  return { getSummary };
}

module.exports = { createReviewSummaryService };
