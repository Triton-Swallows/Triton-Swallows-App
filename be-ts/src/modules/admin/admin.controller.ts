import { Request, Response } from "express";
import { AdminService } from "./admin.service";

export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email: string;
  };
}

export interface AdminController {
  getAllUserInfo: (req: Request, res: Response) => Promise<void>;
  editPoints: (req: Request, res: Response) => Promise<void>;
  getContacts: (req: Request, res: Response) => Promise<void>;
}

export const createAdminController = (
  service: AdminService,
): AdminController => {
  const getAllUserInfo = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await service.getAllUserInfo();
      if (result.ok) {
        res.status(200).json({ data: result.data });
      } else {
        res.status(500).json({ error: result.message });
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  };

  const editPoints = async (req: Request, res: Response): Promise<void> => {
    try {
      const user_id = req.body.uid;
      const bonus_point = req.body.bonus_point;
      const consume_point = req.body.consume_point;

      const result = await service.editPoints(
        user_id,
        bonus_point,
        consume_point,
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

  const getContacts = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await service.getContacts();
      if (result.ok) {
        res.status(200).json({ data: result.data });
      } else {
        res.status(500).json({ error: result.message });
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  };

  return { getAllUserInfo, editPoints, getContacts };
};
