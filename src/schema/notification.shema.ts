import mongoose from "mongoose";
import { z } from "zod";
// Validate if the provided ID is valid ObjectId
function isValidObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}
const payload = {
  body: z.object({
    user: z
      .string({
        required_error: "User is required",
      })
      .refine((data) => isValidObjectId(data), {
        message: "Invalid User id",
      }),
    description: z.string({
      required_error: "Description is required",
    }),
  }),
};

const params = {
  params: z.object({
    notificationId: z.string({
      required_error: "notificationId is required",
    }),
  }),
};

export const createNotificationSchema = z.object({
  ...payload,
});

export const updateNotificationSchema = z.object({
  ...payload,
  ...params,
});

export const deleteNotificationSchema = z.object({
  ...params,
});

export const getNotificationSchema = z.object({
  ...params,
});

export type CreateNotificationInput = z.TypeOf<typeof createNotificationSchema>;
export type UpdateNotificationInput = z.TypeOf<typeof updateNotificationSchema>;
export type ReadNotificationInput = z.TypeOf<typeof getNotificationSchema>;
export type DeleteNotificationInput = z.TypeOf<typeof deleteNotificationSchema>;
