import {
  createNotificationHandler,
  deleteNotificationHandler,
  getAllNotificationsHandler,
  updateNotificationHandler,
} from "../controller/notifications.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { Router } from "express";
import {
  createNotificationSchema,
  deleteNotificationSchema,
  updateNotificationSchema,
} from "../schema/notification.shema";

const router = Router();
router
  .get("/", requireUser, getAllNotificationsHandler)
  .post(
    "/",
    [requireUser, validateResource(createNotificationSchema)],
    createNotificationHandler
  )
  .put(
    "/:notificationId",
    [requireUser, validateResource(updateNotificationSchema)],
    updateNotificationHandler
  )
  .delete(
    "/:notificationId",
    [requireUser, validateResource(deleteNotificationSchema)],
    deleteNotificationHandler
  );
export default router;
