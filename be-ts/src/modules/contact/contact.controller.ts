import { Request, Response } from "express";
import { ContactService } from "./contact.service";

export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email: string;
  };
}

export interface ContactController {
  postContacts: (req: AuthRequest, res: Response) => Promise<void>;
}

export const createContactController = (
  service: ContactService,
): ContactController => {
  const postContacts = async (
    req: AuthRequest,
    res: Response,
  ): Promise<void> => {
    try {
      const user_id = req.user!.uid;
      const email = req.user!.email;
      const target = req.body.target;
      const description = req.body.description;
      const others = req.body.others;
      const bonus_rate = req.body.bonus_rate;

      const result = await service.postContacts(
        user_id,
        email,
        target,
        description,
        others,
        bonus_rate,
      );

      if (result.ok) {
        res.status(201).json({ myInfo: result.data });
      } else {
        res.status(500).json({ error: result.message });
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  };

  return { postContacts };
};
