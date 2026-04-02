import { Request, Response } from "express";
import { AdminService } from "./admin.service";

export interface AdminController {
  getAllUserInfo: (req: Request, res: Response) => Promise<void>;
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

  return { getAllUserInfo };
};
