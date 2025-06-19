import z from "zod";

export const members_get = z.object({
  name: z.string().optional(),
  surname: z.string().optional(),
  script_id: z.coerce.number().optional(),
  member_uid: z.coerce.number().optional(),

  offset: z.coerce.number().min(0).default(0),
  limit: z.coerce.number().min(5).max(30).default(15),
});

export const members_post_required = z.object({
  name: z.string(),
  surname: z.string(),
  script_id: z.number(),
  member_uid: z.number(),
});

export const members_post = z.object({
  name: z
    .string()
    .nonempty("You can't insert an empty record.")
    .transform((val) => val.trim()),
  surname: z
    .string()
    .nonempty("You can't insert an empty record.")
    .transform((val) => val.trim()),
  script_id: z.number().positive(),
  member_uid: z.number().positive(),
  motto: z
    .string()
    .nonempty("You can't insert an empty record.")
    .transform((val) => val.trim())
    .optional(),
});

export const members_get_single = z.object({
  member_id: z.coerce.number().int().positive(),
});

export const members_put = z.object({
  name: z
    .string()
    .trim()
    .nonempty("You can't update the record without a name.")
    .optional(),
  surname: z
    .string()
    .trim()
    .nonempty("You can't update the record without a surname.")
    .optional(),
  script_id: z.coerce.number().positive().optional(),
  member_uid: z.coerce.number().positive().optional(),
  motto: z
    .string()
    .trim()
    .nonempty("You can't update the record without a motto.")
    .optional(),
});
