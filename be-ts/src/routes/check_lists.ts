import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares";
import { CheckListController } from "../modules/check_lists/check_list.controller";

function createCheckListRouter(checklistController: CheckListController) {
  const router = express.Router();

  router.get("/check-lists", verifyToken, checklistController.getCheckList);

  router.patch(
    "/check-lists/:id",
    verifyToken,
    checklistController.editCheckList,
  );

  router.delete(
    "/check-lists/:id",
    verifyToken,
    checklistController.deleteCheckList,
  );

  router.post("/check-lists", verifyToken, checklistController.createCheckList);

  return router;
}

export { createCheckListRouter };
