import z from "zod";

/*export const performances_get = z.object({
    title: z.string().optional(),
    script_id: z.coerce.number().optional(),
    performance_uid: z.coerce.number().optional(),
    offset: z.coerce.number().min(0).default(0),
    limit: z.coerce.number().min(5).max(30).default(15)
});*/

export const performances_roles_post = z.object({
    role_name: z.string().trim().nonempty("You can't insert the record without a role_name."),
    script_id: z.coerce.number().positive(),
    performance_role_uid: z.coerce.number().positive(),
});

export const performances_roles_get_single = z.object({
    role_id: z.coerce.number().int().positive()
});

export const performances_roles_put = z.object({
    role_name: z.string().trim().nonempty("You can't insert the record without a role_name.").optional(),
    script_id: z.coerce.number().positive().optional(),
    performance_role_uid: z.coerce.number().positive().optional(),
});