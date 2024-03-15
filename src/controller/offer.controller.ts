import { Request, Response } from "express";
import { CreateOfferInput, UpdateOfferInput } from "../schema/offer.schema";
import {
  FindOffers,
  createOffer,
  deleteOffer,
  findAndUpdateOffer,
  findOffer,
} from "../service/offer.service";
import logger from "../utils/logger";

export async function createOfferHandler(
  req: Request<{}, {}, CreateOfferInput["body"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const body = req.body;
    const offer = await createOffer({ ...body, user: userId });
    return res.status(200).send({ status: "success", data: offer });
  } catch (err) {
    logger.error("createOfferHandler :", err);
    return res.status(500).send({
      status: "error",
      message: "There was an error creating the offer",
    });
  }
}

export async function updateOfferHandler(
  req: Request<UpdateOfferInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const offerId = req.params.offerId;
  const update = req.body;
  const offer = await findOffer({ offerId });
  if (!offer) {
    return res
      .status(404)
      .send({ status: "error", message: "Offer not found" });
  }
  if (String(offer.user) !== userId) {
    return res
      .status(403)
      .send({ status: "error", message: "You can't update this offer" });
  }
  const updatedoffer = await findAndUpdateOffer({ offerId }, update, {
    new: true,
  });
  return res.status(200).send({ status: "success", data: updatedoffer });
}

export async function getOfferHandler(
  req: Request<UpdateOfferInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const offerId = req.params.offerId;
  const offer = await findOffer({ offerId });
  if (!offer) {
    return res
      .status(404)
      .send({ status: "error", message: "offer not found" });
  }
  if (String(offer.user) !== userId) {
    return res
      .status(403)
      .send({ status: "error", message: "You can't update this offer" });
  }
  return res.status(200).send({ status: "success", data: offer });
}

export async function deleteOfferHandler(
  req: Request<UpdateOfferInput["params"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const offerId = req.params.offerId;
    const offer = await findOffer({ offerId });
    if (!offer) {
      return res
        .status(404)
        .send({ status: "error", message: "offer not found" });
    }
    if (String(offer.user) !== userId) {
      return res
        .status(403)
        .send({ status: "error", message: "You can't delete this offer" });
    }
    await deleteOffer({ offerId });
    return res.status(200).send({ message: "success" });
  } catch (err) {
    logger.error("deleteOfferHandler :", err);
    return res.status(500).send({
      status: "error",
      message: "There was an error deleting the offer",
    });
  }
}
export async function getAllOffersHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 5);
  const { data, total, totalPages } = await FindOffers({
    pagination: { page, limit },
    query: { user: userId },
  });
  if (!data) {
    return res
      .status(404)
      .send({ status: "error", message: "there was an error getting Offers" });
  }
  return res
    .status(200)
    .send({ status: "success", data: { data, page, total, totalPages } });
}
