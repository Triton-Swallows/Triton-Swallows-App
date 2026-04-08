import { CountryController } from "../modules/country/country.controller";
import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares";

function createCountryRouter(countryController: CountryController) {
  const router = express.Router();

  router.get("/countries", verifyToken, countryController.getAll);
  router.get("/guest/countries", countryController.getAllGuest);

  return router;
}

export { createCountryRouter };
