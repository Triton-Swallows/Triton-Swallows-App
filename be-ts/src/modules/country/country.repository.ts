import { Knex } from "knex";
import { Country, GuestCountry } from "../../types/country";

export interface CountryRepository {
  getAll: (userId: string) => Promise<Country[]>;
  getAllGuest: () => Promise<GuestCountry[]>;
}

function createCountryRepository(db: Knex): CountryRepository {
  const getAll = async (userId: string): Promise<Country[]> => {
    return await db("countries")
      .leftJoin("country_cheers", "countries.id", "country_cheers.country_id")
      .count("country_cheers.country_id as cheer_count")
      .groupBy("countries.id")
      .select<
        Country[]
      >("countries.id", "countries.name", "countries.name_en", "countries.available", db("country_cheers").whereRaw("country_cheers.country_id = countries.id").andWhere("country_cheers.user_id", userId).count("country_cheers.country_id").as("cheered_by_me"));
  };

  const getAllGuest = async (): Promise<GuestCountry[]> => {
    return await db("countries")
      .leftJoin("country_cheers", "countries.id", "country_cheers.country_id")
      .count("country_cheers.country_id as cheer_count")
      .groupBy("countries.id")
      .select<
        GuestCountry[]
      >("countries.id", "countries.name", "countries.name_en", "countries.available");
  };

  return { getAll, getAllGuest };
}

export { createCountryRepository };
