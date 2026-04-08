import { Request, Response } from "express";
import { ItemService } from "./items.service";

export interface ItemController {
  getItem: (req: Request, res: Response) => Promise<void>;
  editItem: (req: Request, res: Response) => Promise<void>;
  deleteItem: (req: Request, res: Response) => Promise<void>;
  createItem: (req: Request, res: Response) => Promise<void>;
  editItemStatus: (req: Request, res: Response) => Promise<void>;
  copyItem: (req: Request, res: Response) => Promise<void>;
}

export const createItemController = (service: ItemService): ItemController => {
  const getItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const check_list_id = String(req.params.check_list_id);

      const result = await service.getItem(check_list_id);

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

  const editItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = String(req.params.id);
      const { item } = req.body;

      const result = await service.editItem(id, item);

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

  const deleteItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = String(req.params.id);

      const result = await service.deleteItem(id);

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

  const createItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const check_list_id = String(req.params.check_list_id);
      const { title } = req.body;

      const result = await service.createItem(check_list_id, title);

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

  const editItemStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = String(req.params.id);
      const { status } = req.body;

      const result = await service.editItemStatus(id, status);

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

  const copyItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = String(req.params.id);
      const { check_list_id } = req.body;

      const result = await service.copyItem(id, check_list_id);

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

  return {
    getItem,
    editItem,
    deleteItem,
    createItem,
    editItemStatus,
    copyItem,
  };
};
