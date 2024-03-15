import { z } from "zod";
export const createUserSchema = z.object({
  body: z
    .object({
      name: z.string({
        required_error: "Name is required",
      }),
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(6, "Password too short - should be 6 chars minimum"),
      passwordConfirmation: z.string({
        required_error: "passwordConfirmation is required",
      }),
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Not a valid email"),
      birthdate: z
        .string()
        .optional()
        .nullable()
        .default(() => null),
      bio: z
        .string()
        .optional()
        .nullable()
        .default(() => null),
      avatar: z
        .string()
        .optional()
        .nullable()
        .default(() => null),
      location: z
        .string()
        .optional()
        .nullable()
        .default(() => null),
      languages: z
        .array(z.string())
        .optional()
        .nullable()
        .default(() => null),
      niche: z
        .array(z.string())
        .optional()
        .nullable()
        .default(() => null),
      verified: z
        .boolean()
        .optional()
        .default(() => false),
      topPick: z
        .boolean()
        .optional()
        .default(() => false),
      haveVideo: z
        .boolean()
        .optional()
        .default(() => false),
      creator: z
        .boolean()
        .optional()
        .default(() => false),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    })
    .refine(
      (data) =>
        (data.birthdate && !isNaN(new Date(data.birthdate).getTime())) ||
        !data.birthdate,
      {
        message: "Birthdate must be a valid date",
        path: ["birthdate"],
      }
    )
    .refine(
      (data) =>
        (data.birthdate && new Date(data.birthdate) < new Date()) ||
        !data.birthdate,
      {
        message: "Birthdate must be in the past",
        path: ["birthdate"],
      }
    )
    .refine(
      (data) =>
        (data.birthdate && new Date(data.birthdate) > new Date("1900-01-01")) ||
        !data.birthdate,
      {
        message: "Birthdate must after 1900/01/01",
        path: ["birthdate"],
      }
    ),
});

export type CreateUserInput = Omit<
  z.TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
