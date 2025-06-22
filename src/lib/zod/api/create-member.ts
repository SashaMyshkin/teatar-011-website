import z from "zod";

export const createMemberRequiredFields = z.object({
  identifier: z.string({ message: "The field 'identifier' is required" }),
  date_of_joining: z.string({
    message: "The field 'date_of_joining' is required",
  }),
  membership_status_uid: z.coerce.number({
    message: "The field 'membership_status_uid' is required and it has to be a number.",
  }),
  name: z.string({ message: "The field 'name' is required" }),
  surname: z.string({ message: "The field 'surname' is required" }),
});

export const createMembersValidFormat = z.object({
  identifier: z
    .string({ message: "The field 'identifier' is required" })
    .trim()
    .nonempty("The field 'identifier' cannot be an empty string.")
    .regex(/^[a-z0-9-]+$/, "Allowed characters: a–z, 0–9, and hyphen (-).")
    .min(6, "Minimum number of characters: 6."),
  date_of_joining: z
    .string({ message: "The field 'date_of_joining' is required" })
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in yyyy-mm-dd format"),
  membership_status_uid: z.coerce
    .number({
      message: "The field 'membership_status_uid' has to be a number.",
    })
    .positive("The field 'membership_status_uid' has to be a positive number.")
    .min(1, "The field 'membership_status_uid' cannot be zero."),
  script_id: z.coerce
    .number({
      message: "The field 'script_id' has to be a number.",
    })
    .positive("The field 'script_id' has to be a positive number.")
    .min(1, "The field 'script_id' cannot be zero."),
  name: z
    .string({ message: "The field 'name' is required" })
    .trim()
    .nonempty("The field 'name' cannot be an empty string."),
  surname: z
    .string({ message: "The field 'surname' is required" })
    .trim()
    .nonempty("The field 'surname' cannot be an empty string."),
});
