function createLikeService(repository) {
  const post = async (user_id, review_id) => {
    const existing = await repository.findLike(user_id, review_id);
    if (!existing) {
      try {
        const data = await repository.post(user_id, review_id);
        return { ok: true, data };
      } catch (error) {
        return { ok: false, status: 500, message: error.message };
      }
    } else {
      return { ok: false, status: 400, message: "既にいいねしています" };
    }
  };

  const del = async (user_id, review_id) => {
    const existing = await repository.findLike(user_id, review_id);
    if (existing) {
      try {
        const data = await repository.del(user_id, review_id);
        return { ok: true, data };
      } catch (error) {
        return { ok: false, status: 500, message: error.message };
      }
    } else {
      return { ok: false, status: 400, message: "いいねしていません" };
    }
  };

  return { post, del };
}

module.exports = { createLikeService };
