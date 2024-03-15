import { Request, Response } from "express";
import {
  CreateNotificationInput,
  DeleteNotificationInput,
  UpdateNotificationInput,
} from "../schema/notification.shema";
import {
  createNotification,
  deleteNotification,
  findNotification,
  findNotifications,
  updateNotification,
} from "../service/notification.service";
import { findUser } from "../service/user.service";

export async function getAllNotificationsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 5);
  const paginatedData = await findNotifications({
    query: { user: userId },
    pagination: { page, limit },
  });
  return res
    .status(200)
    .send({ status: "success", data: { ...paginatedData, page } });
}
export async function createNotificationHandler(
  req: Request<{}, {}, CreateNotificationInput["body"]>,
  res: Response
) {
  const payload = req.body;
  const user = await findUser({ _id: payload.user });
  if (!user) {
    return res
      .status(404)
      .send({ status: "error", message: "Invalid User id" });
  }
  const notification = await createNotification(payload);
  return res.status(200).send({ status: "success", data: notification });
}
export async function updateNotificationHandler(
  req: Request<UpdateNotificationInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const { notificationId } = req.params;
  const notification = await findNotification({ notificationId, user: userId });
  if (!notification) {
    return res
      .status(404)
      .send({ status: "error", message: "Notification not found" });
  }
  if (String(notification.user) !== userId) {
    return res
      .status(403)
      .send({ status: "error", message: "You can't update this notification" });
  }
  const updatedNotification = await updateNotification(
    { notificationId },
    req.body,
    {
      new: true,
    }
  );
  return res.status(200).send({ status: "success", data: updatedNotification });
}

export async function deleteNotificationHandler(
  req: Request<DeleteNotificationInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const { notificationId } = req.params;
  const notification = await findNotification({ notificationId, user: userId });
  if (!notification) {
    return res
      .status(404)
      .send({ status: "error", message: "Notification not found" });
  }
  if (String(notification.user) !== userId) {
    return res
      .status(403)
      .send({ status: "error", message: "You can't delete this notification" });
  }
  await deleteNotification({ notificationId });
  return res.status(200).send({ status: "success" });
}
