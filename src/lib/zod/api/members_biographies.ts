import z from "zod";

export const addParagraphRequiredFields = z.object({
  script_id: z.coerce.number(),
  identifier: z.string(),
  paragraph: z.string(),
});

export const addParagraphValidFormat = z.object({
  script_id: z.coerce.number().positive(),
  identifier: z
    .string()
    .trim()
    .nonempty("You can't insert the record without an identifier."),
  paragraph: z
    .string()
    .trim()
    .nonempty("You can't insert the record without a paragraph."),
});

export const idValidation = z.object({
  id: z.coerce.number().int().positive().min(1),
});

export const updateParagraphValidFormat = z.object({
  paragraph: z
    .string()
    .trim()
    .nonempty("You can't set a paragraph to be an empty string.")
    .optional(),
  order_number: z.coerce.number().optional(),
});

export const members_biographies_get = z.object({
  script_id: z.coerce.number().optional(),
  member_uid: z.coerce.number(),
  offset: z.coerce.number().min(0).default(0),
  limit: z.coerce.number().min(5).max(30).default(15),
});


