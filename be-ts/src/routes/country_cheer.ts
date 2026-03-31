import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares";
import { CountryCheersController } from "../modules/country_cheers/country_cheers.controller";

function createCountryCheersRouter(countryCheersController: any) {
  const router = express.Router();

  router.post("/country_cheers", verifyToken, countryCheersController.post);
  router.delete(
    "/country_cheers/:countryId",
    verifyToken,
    countryCheersController.del,
  );

  return router;
}

export { createCountryCheersRouter };
