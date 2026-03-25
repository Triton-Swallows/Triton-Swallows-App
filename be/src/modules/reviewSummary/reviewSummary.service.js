function createReviewSummaryService(repository) {
  const getSummary = async (userId, country) => {
    try {
      const summaries = await repository.getSummary(userId, country);
      const data = summaries.map((summary) => ({
        ...summary,
        liked_by_me: !!Number(summary.liked_by_me),
      }));
      return { ok: true, data };
    } catch (error) {
      return { ok: false, status: 500, message: error.message };
    }
  };
  const postLike = async (userId, summary_id) => {
    try {
      const data = await repository.postLike(userId, summary_id);
      return { ok: true, data };
    } catch (error) {
      return { ok: false, status: 500, message: error.message };
    }
  };

  const deleteLike = async (userId, summary_id) => {
    try {
      const data = await repository.deleteLike(userId, summary_id);
      return { ok: true, data };
    } catch (error) {
      return { ok: false, status: 500, message: error.message };
    }
  };

  return { getSummary, postLike, deleteLike };
}

module.exports = { createReviewSummaryService };
