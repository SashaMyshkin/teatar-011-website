import z from "zod";

export const v_members_get = z.object({
  name: z.string().nonempty().toLowerCase().optional(),
  surname: z.string().nonempty().toLowerCase().optional(),
  script_id: z.coerce.number(),
  date_of_joining: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in yyyy-mm-dd format").optional(),
  is_public: z.coerce.number().optional(),

  page: z.coerce.number().min(0).default(0),
  pageSize: z.coerce.number().min(5).max(30).default(5),
});
