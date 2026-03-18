function createUserController(service, repository) {
  // 認証ユーザーの情報取得
  const getMe = async (req, res) => {
    try {
      const uid = req.user.uid;
      const user = await repository.findByUid(uid);

      if (!user) {
        return res.status(404).json({ error: "ユーザが見つかりませんでした" });
      }

      res.status(200).json({ data: user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // ユーザー登録/更新
  const upsert = async (req, res) => {
    try {
      const uid = req.user.uid;
      const email = req.user.email;

      const result = await service.upsert(uid, email);

      if (result.ok) {
        res.status(201).json({ data: result.data });
      } else {
        res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  return { getMe, upsert };
}

module.exports = { createUserController };
