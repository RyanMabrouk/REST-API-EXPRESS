import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);
export interface NotificationInput {
  user: UserDocument["_id"];
  description: string;
}

export interface NotificationDocument
  extends NotificationInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new mongoose.Schema(
  {
    notificationId: {
      type: String,
      required: true,
      unique: true,
      default: () => `notification_${nanoid()}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const NotificationModel = mongoose.model<NotificationDocument>(
  "Notification",
  NotificationSchema
);

export default NotificationModel;
