import z from "zod";

export const members_biographies_get = z.object({
  script_id: z.coerce.number().optional(),
  member_uid: z.coerce.number(),
  offset: z.coerce.number().min(0).default(0),
  limit: z.coerce.number().min(5).max(30).default(15),
});

export const members_biographies_post = z.object({
  script_id: z.coerce.number().positive(),
  member_uid: z.coerce.number().positive(),
  order_number: z.coerce.number().positive(),
  paragraph: z
    .string()
    .trim()
    .nonempty("You can't insert the record without a paragraph."),
});

export const members_biographies_get_single = z.object({
  paragraph_id: z.coerce.number().int().positive(),
});

export const members_biographies_put = z.object({
  paragraph: z
    .string()
    .trim()
    .nonempty("You can't update the record without a name.")
    .optional(),
  script_id: z.coerce.number().positive().optional(),
  member_uid: z.coerce.number().positive().optional(),
  order_number: z.coerce.number().positive(),
});
