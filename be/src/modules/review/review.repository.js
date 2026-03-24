function createReviewRepository(knex) {
  const getAll = async () => {
    return await knex("reviews").select("*");
  };

  return { getAll };
}

module.exports = { createReviewRepository };
