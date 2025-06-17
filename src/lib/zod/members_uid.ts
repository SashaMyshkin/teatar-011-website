import z from "zod";

export const members_uid_post = z.object({
  identifier: z.string().min(1),
  email: z.string().email("Invalid email address").optional(),
  date_of_birth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in yyyy-mm-dd format")
    .optional(),
  date_of_joining: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in yyyy-mm-dd format"),
  date_of_leaving: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in yyyy-mm-dd format")
    .optional(),
  membership_status_uid: z.coerce.number(),
  public_: z.coerce.number(),
});

export const members_uid_put = members_uid_post.extend({ id: z.coerce.number() });

export const members_uid_get = z.object({
  identifier: z.string().min(1).optional(),
  email: z.string().optional(),
  membership_status_uid: z.coerce.number().optional(),
  public_: z.coerce.number().optional(),
  offset: z.coerce.number().min(0).default(0),
  limit: z.coerce.number().min(5).max(30).default(15),
});

export const members_uid_delete = z.object({ id: z.coerce.number() });
