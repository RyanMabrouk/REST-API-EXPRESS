import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { databaseResponseTimeHistogram } from "../utils/metrics";
import { paginateQuery } from "../utils/pagination";
import OfferModel, { OfferDocument, OfferInput } from "../models/offer.model";
import logger from "../utils/logger";

export async function createOffer(input: OfferInput) {
  const metricsLabels = {
    operation: "createOffer",
  };
  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await OfferModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (err) {
    timer({ ...metricsLabels, success: "false" });
    logger.error(err);
    throw err;
  }
}

export async function findOffer(
  query: FilterQuery<OfferDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findOffer",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await OfferModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (err) {
    timer({ ...metricsLabels, success: "false" });
    logger.error(err);
    throw err;
  }
}
export async function FindOffers({
  query = {},
  options = { lean: true },
  pagination,
}: {
  query?: FilterQuery<OfferDocument>;
  options?: QueryOptions;
  pagination: { page: number; limit: number };
}) {
  const metricsLabels = {
    operation: "findOffer",
  };
  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const { data, total, totalPages } = await paginateQuery<OfferDocument>({
      model: OfferModel,
      query,
      options,
      pagination,
    });
    timer({ ...metricsLabels, success: "true" });
    return { data, total, totalPages };
  } catch (err) {
    timer({ ...metricsLabels, success: "false" });
    logger.error(err);
    throw err;
  }
}
export async function findAndUpdateOffer(
  query: FilterQuery<OfferDocument>,
  update: UpdateQuery<OfferDocument>,
  options: QueryOptions
) {
  return OfferModel.findOneAndUpdate(query, update, options);
}

export async function deleteOffer(query: FilterQuery<OfferDocument>) {
  return OfferModel.deleteOne(query);
}
