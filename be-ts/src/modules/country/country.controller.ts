import { Request, Response } from "express";
import { CountryService } from "./country.service";

export interface AuthRequest extends Request {
  user?: {
    uid: string;
  };
}

export interface CountryController {
  getAll: (req: AuthRequest, res: Response) => Promise<void>;
  getAllGuest: (req: Request, res: Response) => Promise<void>;
}

function createCountryController(service: CountryService): CountryController {
  const getAll = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user!.uid;
    try {
      const result = await service.getAll(userId);

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

  const getAllGuest = async (req: Request, res: Response) => {
    try {
      const result = await service.getAllGuest();

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

  return { getAll, getAllGuest };
}

export { createCountryController };
