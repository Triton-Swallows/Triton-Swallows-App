import { Request, Response } from "express";
import { CheckListService } from "./check_list.service";

export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email: string;
  };
}

export interface CheckListController {
  getCheckList: (req: AuthRequest, res: Response) => Promise<void>;
  editCheckList: (req: Request, res: Response) => Promise<void>;
  deleteCheckList: (req: Request, res: Response) => Promise<void>;
  createCheckList: (req: Request, res: Response) => Promise<void>;
}

export const createCheckListController = (
  service: CheckListService,
): CheckListController => {
  const getCheckList = async (
    req: AuthRequest,
    res: Response,
  ): Promise<void> => {
    try {
      const user_id = req.user!.uid;

      const result = await service.getCheckLists(user_id);

      if (result.ok) {
        res.status(201).json({ data: result.data });
      } else {
        res.status(500).json({ error: result.message });
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  };

  const editCheckList = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = String(req.params.id);
      const { title } = req.body;

      const result = await service.editCheckList(id, title);

      if (result.ok) {
        res.status(201).json({ data: result.data });
      } else {
        res.status(500).json({ error: result.message });
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  };

  const deleteCheckList = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = String(req.params.id);

      const result = await service.deleteCheckList(id);

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

  const createCheckList = async (
    req: AuthRequest,
    res: Response,
  ): Promise<void> => {
    try {
      const user_id = req.user!.uid;
      const { title } = req.body;

      const result = await service.createCheckList(user_id, title);

      if (result.ok) {
        res.status(201).json({ data: result.data });
      } else {
        res.status(500).json({ error: result.message });
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  };

  return { getCheckList, editCheckList, deleteCheckList, createCheckList };
};
