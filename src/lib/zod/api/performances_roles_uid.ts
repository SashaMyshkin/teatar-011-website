import z from "zod";

export const performances_roles_uid_get = z.object({
  performance_uid: z.coerce.number().optional(),
  offset: z.coerce.number().min(0).default(0),
  limit: z.coerce.number().min(5).max(30).default(15),
});

export const performances_roles_uid_post = z.object({
  importance: z.coerce.number().default(0),
  performance_uid: z.coerce.number(),
  description: z.string().trim().nonempty("Description cannot be an empty record."),
});

export const performances_roles_uid_single = z.object({
 role_uid: z.coerce.number().int().positive(), // coerce string to number and validate it's a positive integer
});

export const performances_roles_uid_put = z.object({
  importance: z.coerce.number().default(0).optional(),
  performance_uid: z.coerce.number().optional(),
  description: z.string().trim().nonempty("Description cannot be an empty record.").optional(),
});