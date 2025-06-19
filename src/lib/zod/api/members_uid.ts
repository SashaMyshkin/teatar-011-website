import z from "zod";

export const members_uid_post_requred = z.object({
  identifier: z.string(),
  date_of_joining: z.string(),
  membership_status_uid: z.coerce.number(),
});

export const members_uid_post = z.object({
  identifier: z.string().nonempty("Identifier must not be empty."),
  email: z.string().email("Invalid email address").optional(),
  date_of_birth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in yyyy-mm-dd format")
    .optional(),
  date_of_joining: z
    .string()
    .transform((value) => value.slice(0, 10))
    .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: "Date must be in yyyy-mm-dd format",
    }),

  date_of_leaving: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in yyyy-mm-dd format")
    .optional(),
  membership_status_uid: z.coerce.number(),
  is_public: z.coerce.number().default(0),
});

export const members_uid_put = z.object({
  identifier: z.string().min(1).optional(),
  email: z.string().email("Invalid email address").optional(),
  date_of_birth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in yyyy-mm-dd format")
    .optional(),
  date_of_joining: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in yyyy-mm-dd format")
    .optional(),
  date_of_leaving: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in yyyy-mm-dd format")
    .optional(),
  membership_status_uid: z.coerce.number().optional(),
  is_public: z.coerce.number().optional(),
});

export const members_uid_get_required = z.object({
  offset: z.string(),
  limit: z.string(),
});

export const members_uid_get = z.object({
  offset: z.coerce.number().positive(),
  limit: z.coerce.number().positive().min(5).max(30),
});

export const members_uid_single = z.object({
  member_uid: z.coerce.number().int().positive(), // coerce string to number and validate it's a positive integer
});

export const members_uid_delete = z.object({ id: z.coerce.number() });
