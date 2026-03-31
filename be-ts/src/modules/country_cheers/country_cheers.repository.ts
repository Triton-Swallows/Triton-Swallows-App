import { Knex } from "knex";
import { CountryCheer } from "../../types/country_cheers";

export interface CountryCheersRepository {
  findCheer: (
    user_id: string,
    country_id: number,
  ) => Promise<CountryCheer | undefined>;
  post: (user_id: string, country_id: number) => Promise<CountryCheer[]>;
  del: (user_id: string, country_id: number) => Promise<CountryCheer[]>;
}

function createCountryCheersRepository(knex: Knex): CountryCheersRepository {
  const findCheer = async (
    user_id: string,
    country_id: number,
  ): Promise<CountryCheer | undefined> => {
    return await knex("country_cheers")
      .where("country_cheers.user_id", user_id)
      .andWhere("country_cheers.country_id", country_id)
      .first();
  };

  const post = async (
    user_id: string,
    country_id: number,
  ): Promise<CountryCheer[]> => {
    return await knex("country_cheers")
      .insert({ user_id, country_id })
      .returning("*");
  };

  const del = async (
    user_id: string,
    country_id: number,
  ): Promise<CountryCheer[]> => {
    return await knex("country_cheers")
      .where("user_id", user_id)
      .andWhere("country_id", country_id)
      .del()
      .returning("*");
  };

  return { findCheer, post, del };
}

export { createCountryCheersRepository };
