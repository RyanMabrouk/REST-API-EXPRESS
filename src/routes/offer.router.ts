import {
  createOfferSchema,
  deleteOfferSchema,
  getOfferSchema,
  updateOfferSchema,
} from "../schema/offer.schema";
import {
  createOfferHandler,
  getOfferHandler,
  updateOfferHandler,
  deleteOfferHandler,
  getAllOffersHandler,
} from "../controller/offer.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { Router } from "express";

const router = Router();
router
  .get("/", requireUser, getAllOffersHandler)
  .post(
    "/",
    [requireUser, validateResource(createOfferSchema)],
    createOfferHandler
  )
  .put(
    "/:offerId",
    [requireUser, validateResource(updateOfferSchema)],
    updateOfferHandler
  )
  .get(
    "/:offerId",
    [requireUser, validateResource(getOfferSchema)],
    getOfferHandler
  )
  .delete(
    "/:offerId",
    [requireUser, validateResource(deleteOfferSchema)],
    deleteOfferHandler
  );
export default router;
