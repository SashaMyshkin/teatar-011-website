import z from "zod";

export const performances_get = z.object({
    title: z.string().optional(),
    script_id: z.coerce.number().optional(),
    performance_uid: z.coerce.number().optional(),
    offset: z.coerce.number().min(0).default(0),
    limit: z.coerce.number().min(5).max(30).default(15)
});

export const performances_post = z.object({
    title: z.string().trim().nonempty("You can't insert the record without a title."),
    slogan: z.string().trim().nonempty("You can't insert the record without a slogan."),
    script_id: z.coerce.number().positive(),
    performance_uid: z.coerce.number().positive(),
});

export const performance_get_single = z.object({
    performance_id: z.coerce.number().int().positive()
});

export const performance_put = z.object({
    title: z.string().trim().nonempty("You can't update the record without a title.").optional(),
    slogan: z.string().trim().nonempty("You can't update the record without a slogan.").optional(),
    script_id: z.coerce.number().positive().optional(),
    performance_uid: z.coerce.number().positive().optional(),
});