import { CountryCheersService } from "./country_cheers.service";
import { Request, Response } from "express";

export interface AuthRequest extends Request {
  user?: {
    uid: string;
  };
}

export interface CountryCheersController {
  post: (req: AuthRequest, res: Response) => Promise<void>;
  del: (req: AuthRequest, res: Response) => Promise<void>;
}

function createCountryCheersController(service: CountryCheersService) {
  const post = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const user_id = req.user!.uid;
      const country_id = req.body.country_id;

      const result = await service.post(user_id, country_id);

      if (result.ok) {
        res.status(201).json({ data: result.data });
      } else {
        res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  };

  const del = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const user_id = req.user!.uid;
      const country_id = Number(req.params.countryId);

      const result = await service.del(user_id, country_id);

      if (result.ok) {
        res.status(200).json({ data: result.data });
      } else {
        res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  };

  return { post, del };
}

export { createCountryCheersController };
