import z from "zod";

// Define the schema
export const getSchema = z.object({
  offset: z.coerce.number().min(0).default(0),
  limit: z.coerce.number().min(1).max(100).default(10),
  scriptId: z.coerce.number().optional(),
  identifier: z.string().optional(),
  membershipStatusUID: z.coerce.number().optional(),
  isPublic: z.coerce.boolean().optional(),
  email: z.string().optional(),
  memberUID: z.coerce.number().optional(),
});

const member = z.object({
  name: z.string().min(1).max(30),
  surname: z.string().min(1).max(30),
  motto: z.string().min(1).max(90),
  script_id: z.number().min(1),
});

const biography = z.object({
  paragraph: z.string().min(1),
  member_uid: z.number().min(1),
  order_number: z.number().min(1),
  script_id: z.number().min(1),
});

// Define your schema
export const membersUID = z.object({
  identifier: z.string().min(1),
  email: z.string().email("Invalid email address"),
  date_of_birth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in yyyy-mm-dd format"),
  date_of_joining: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in yyyy-mm-dd format"),
  date_of_leaving: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in yyyy-mm-dd format")
    .optional(),
  membership_status_uid: z.coerce.number(),
  public: z.coerce.number(),
  member: z.array(member),
  biography:  z.array(biography),
});