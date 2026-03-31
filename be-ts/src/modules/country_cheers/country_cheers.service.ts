import { CountryCheersRepository } from "./country_cheers.repository";
import { CountryCheer } from "../../types/country_cheers";
import { ServiceResponse } from "../../types/api-response";

export interface CountryCheersService {
  post: (
    user_id: string,
    country_id: number,
  ) => Promise<ServiceResponse<CountryCheer[]>>;
  del: (
    user_id: string,
    country_id: number,
  ) => Promise<ServiceResponse<CountryCheer[]>>;
}

function createCountryCheersService(
  repository: CountryCheersRepository,
): CountryCheersService {
  const post = async (
    user_id: string,
    country_id: number,
  ): Promise<ServiceResponse<CountryCheer[]>> => {
    const existing = await repository.findCheer(user_id, country_id);
    if (!existing) {
      try {
        const data = await repository.post(user_id, country_id);
        return { ok: true, data };
      } catch (error) {
        const err = error as Error;
        return { ok: false, status: 500, message: err.message };
      }
    } else {
      return { ok: false, status: 400, message: "既に応援しています" };
    }
  };

  const del = async (
    user_id: string,
    country_id: number,
  ): Promise<ServiceResponse<CountryCheer[]>> => {
    const existing = await repository.findCheer(user_id, country_id);
    if (existing) {
      try {
        const data = await repository.del(user_id, country_id);
        return { ok: true, data };
      } catch (error) {
        const err = error as Error;
        return { ok: false, status: 500, message: err.message };
      }
    } else {
      return { ok: false, status: 400, message: "応援していません" };
    }
  };

  return { post, del };
}

export { createCountryCheersService };
