import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import CreatorModel, {
  CreatorDocument,
  CreatorInput,
} from "../models/creator.model";
import logger from "../utils/logger";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export async function createCreator(input: CreatorInput) {
  const metricsLabels = {
    operation: "createCreator",
  };
  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await CreatorModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (err) {
    timer({ ...metricsLabels, success: "false" });
    logger.error(err);
    throw err;
  }
}
export async function findAndCreatorOffer(
  query: FilterQuery<CreatorDocument>,
  update: UpdateQuery<CreatorDocument>,
  options: QueryOptions
) {
  return CreatorModel.findOneAndUpdate(query, update, options);
}
