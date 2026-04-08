import { ContactRepository } from "./contact.repository";
import { ContactServiceResponse, Contacts } from "../../types/contact";

export interface ContactService {
  postContacts: (
    user_id: string,
    email: string,
    target: string,
    description: string,
    others: string,
    bonus_rate: number,
  ) => Promise<ContactServiceResponse<Contacts>>;
}

export const createContactService = (
  repository: ContactRepository,
): ContactService => {
  const postContacts = async (
    user_id: string,
    email: string,
    target: string,
    description: string,
    others: string,
    bonus_rate: number,
  ): Promise<ContactServiceResponse<Contacts>> => {
    try {
      const data = await repository.postContacts(
        user_id,
        email,
        target,
        description,
        others,
        bonus_rate,
      );
      return { ok: true, data };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  return { postContacts };
};
