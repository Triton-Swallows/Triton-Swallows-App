function createUserRepository(knex, table = "users") {
  // uidで検索
  const findByUid = async (uid) => {
    return await knex(table).where({ uid }).first();
  };

  // uidが存在しなければ作成（既存ユーザーは更新しない）
  const upsert = async (uid, email) => {
    const existing = await findByUid(uid);
    if (!existing) {
      await knex(table).insert({ uid, email });
    }
    return await findByUid(uid);
  };

  return { findByUid, upsert };
}

module.exports = { createUserRepository };
