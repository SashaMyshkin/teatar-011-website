import z from "zod";

export const performances_uid_get = z.object({
  is_public: z.coerce.number().optional(),
  performance_type_uid: z.coerce.number().optional(),
  offset: z.coerce.number().min(0).default(0),
  limit: z.coerce.number().min(5).max(30).default(15),
});

export const performances_uid_post = z.object({
  is_public: z.coerce.number().default(0),
  performance_type_uid: z.coerce.number(),
  identifier: z.string().trim().nonempty("Identifier cannot be an empty record."),
  date_of_premiere: z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in yyyy-mm-dd format"),
});

export const performances_uid_single = z.object({
  performance_uid: z.coerce.number().int().positive(), // coerce string to number and validate it's a positive integer
});

export const performances_uid_put = z.object({
  is_public: z.coerce.number().optional(),
  performance_type_uid: z.coerce.number().optional(),
  identifier: z.string().trim().nonempty("Identifier cannot be an empty record.").optional(),
  date_of_premiere: z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in yyyy-mm-dd format").optional(),
});