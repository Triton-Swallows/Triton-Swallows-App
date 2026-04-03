import { Knex } from "knex";
import { Contacts } from "../../types/admin";

export interface ContactRepository {
  postContacts: (
    user_id: string,
    email: string,
    target: string,
    description: string,
    others: string,
    bonus_rate: number,
  ) => Promise<Contacts>;
}

export const createContactRepository = (db: Knex): ContactRepository => {
  const postContacts = async (
    user_id: string,
    email: string,
    target: string,
    description: string,
    others: string,
    bonus_rate: number,
  ): Promise<Contacts> => {
    return await db("contacts").insert({
      user_id,
      email,
      target,
      description,
      others,
      bonus_rate,
    });
  };

  return {
    postContacts,
  };
};
