import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares";
import { ContactController } from "../modules/contact/contact.controller";

function createContactRouter(contactController: ContactController) {
  const router = express.Router();

  router.post("/contacts", verifyToken, contactController.postContacts);

  return router;
}

export { createContactRouter };
