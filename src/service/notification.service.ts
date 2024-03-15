import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { databaseResponseTimeHistogram } from "../utils/metrics";
import { paginateQuery } from "../utils/pagination";
import NotificationModel, {
  NotificationDocument,
  NotificationInput,
} from "../models/notification.model";
import logger from "../utils/logger";

export async function createNotification(input: NotificationInput) {
  const metricsLabels = {
    operation: "createNotification",
  };
  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await NotificationModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (err) {
    timer({ ...metricsLabels, success: "false" });
    logger.error(err);
    throw err;
  }
}

export async function findNotification(
  query: FilterQuery<NotificationDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findNotification",
  };
  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await NotificationModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (err) {
    timer({ ...metricsLabels, success: "false" });
    logger.error(err);
    throw err;
  }
}
export async function findNotifications({
  query = {},
  options = { lean: true },
  pagination,
}: {
  query?: FilterQuery<NotificationDocument>;
  options?: QueryOptions;
  pagination: { page: number; limit: number };
}) {
  const metricsLabels = {
    operation: "findNotifications",
  };
  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const { data, total, totalPages } =
      await paginateQuery<NotificationDocument>({
        model: NotificationModel,
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
export async function updateNotification(
  query: FilterQuery<NotificationDocument>,
  update: UpdateQuery<NotificationDocument>,
  options: QueryOptions
) {
  return NotificationModel.findOneAndUpdate(query, update, options);
}

export async function deleteNotification(
  query: FilterQuery<NotificationDocument>
) {
  return NotificationModel.deleteOne(query);
}
