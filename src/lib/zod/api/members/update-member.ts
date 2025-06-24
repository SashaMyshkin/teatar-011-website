import z from "zod";

export const updateMemberRequiredFields = z.object({
  identifier: z.string({ message: "The field 'identifier' is required" }),
  script_id: z.coerce.number({
    message: "The field 'script_id' has to be a number.",
  }),
});
export const updateMembersValidFormat = z.object({
  date_of_joining: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in yyyy-mm-dd format")
    .optional(),
  identifier: z.string({ message: "The field 'identifier' is required" }),
  date_of_birth: z
    .string()
    .trim()
    .transform((val) => (val === "" ? null : val))
    .refine((val) => val === null || /^\d{4}-\d{2}-\d{2}$/.test(val), {
      message: "Date must be in yyyy-mm-dd format",
    })
    .optional()
    .optional(),
  membership_status_uid: z.coerce
    .number()
    .positive("The field 'membership_status_uid' has to be a positive number.")
    .min(1, "The field 'membership_status_uid' cannot be zero.")
    .optional(),
  email: z
    .string()
    .trim()
    .transform((val) => (val === "" ? null : val))
    .refine(
      (val) => val === null || z.string().email().safeParse(val).success,
      {
        message: "Invalid email",
      }
    )
    .optional(),
  script_id: z.coerce
    .number({
      message: "The field 'script_id' has to be a number.",
    })
    .positive("The field 'script_id' has to be a positive number.")
    .min(1, "The field 'script_id' cannot be zero."),
  name: z
    .string()
    .trim()
    .nonempty("The field 'name' cannot be an empty string.")
    .optional(),
  surname: z
    .string({ message: "The field 'surname' is required" })
    .trim()
    .nonempty("The field 'surname' cannot be an empty string.")
    .optional(),
  motto: z
    .string()
    .trim()
    .transform((val) => (val === "" ? null : val))
    .refine((val) => val === null || val.length >= 6, {
      message: "Motto must be at least 6 characters long.",
    })
    .optional(),
});
