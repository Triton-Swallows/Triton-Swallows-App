function createUserService(repository) {
  const upsert = async (uid, email) => {
    if (!uid || !email) {
      return {
        ok: false,
        status: 400,
        message: "uid/emailのいずれかが不足しています",
      };
    }
    const user = await repository.upsert(uid, email);
    return { ok: true, data: user };
  };

  return { upsert };
}

module.exports = { createUserService };
