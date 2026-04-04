import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares";
import { ItemController } from "../modules/items/items.controller";

function createItemRouter(ItemController: ItemController) {
  const router = express.Router();

  router.get("/items/:check_list_id", verifyToken, ItemController.getItem);

  router.patch("/items/:id", verifyToken, ItemController.editItem);

  router.delete("/items/:id", verifyToken, ItemController.deleteItem);

  router.post("/items/:check_list_id", verifyToken, ItemController.createItem);

  return router;
}

export { createItemRouter };
