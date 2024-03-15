import { z } from "zod";
const phoneRegex = new RegExp(/^\+?[1-9][0-9]{7,14}$/);
const payload = {
  body: z.object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .min(5, "Title should be at least 5 characters long"),
    description: z
      .string({
        required_error: "Description is required",
      })
      .min(120, "Description should be at least 120 characters long"),
    price: z.number({
      required_error: "Price is required",
    }),
    tel: z
      .string({
        required_error: "Phone Number is required",
      })
      .min(8, "Phone number should be at least 8 characters long")
      .regex(phoneRegex, "Invalid Number!"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Not a valid email"),
    status: z
      .enum(["Pending", "Approved", "Declined"])
      .optional()
      .default("Pending")
      .refine((value) => ["Pending", "Approved", "Declined"].includes(value), {
        message: "Status must be 'Pending', 'Approved', or 'Declined'",
      }),
  }),
};

const params = {
  params: z.object({
    offerId: z.string({
      required_error: "offerId is required",
    }),
  }),
};

export const createOfferSchema = z.object({
  ...payload,
});

export const updateOfferSchema = z.object({
  ...payload,
  ...params,
});

export const deleteOfferSchema = z.object({
  ...params,
});

export const getOfferSchema = z.object({
  ...params,
});

export type CreateOfferInput = z.TypeOf<typeof createOfferSchema>;
export type UpdateOfferInput = z.TypeOf<typeof updateOfferSchema>;
export type ReadOfferInput = z.TypeOf<typeof getOfferSchema>;
export type DeleteOfferInput = z.TypeOf<typeof deleteOfferSchema>;
