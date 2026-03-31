import { Country, GuestCountry } from "../../types/country";
import { ServiceResponse } from "../../types/api-response";
import { CountryRepository } from "./country.repository";

export interface CountryService {
  getAll: (userId: string) => Promise<ServiceResponse<Country[]>>;
  getAllGuest: () => Promise<ServiceResponse<GuestCountry[]>>;
}

function createCountryService(repository: CountryRepository): CountryService {
  const getAll = async (
    userId: string,
  ): Promise<ServiceResponse<Country[]>> => {
    try {
      const reviews = await repository.getAll(userId);
      const data = reviews.map((review) => ({
        ...review,
        cheered_by_me: Boolean(Number(review.cheered_by_me)),
      }));
      return { ok: true, data };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  const getAllGuest = async (): Promise<ServiceResponse<GuestCountry[]>> => {
    try {
      const data = await repository.getAllGuest();
      return { ok: true, data };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  return { getAll, getAllGuest };
}

export { createCountryService };
