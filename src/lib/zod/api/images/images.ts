import { z } from "zod";

export const searchParamsValidation = z.object({
  identifier: z.string().trim().min(1, "Identifier URL parameter is required"),
  script_id: z.coerce.number().positive("Script ID must be a positive number"),
  type: z.string().trim().min(1, "Type URL parameter is required"),
});

export const addImageValidator = z.object({
  script_id: z.coerce.number().positive("Script ID must be a positive number"),
  entity_id: z.coerce.number().positive("Entity ID must be a positive number"),
  entity_type_id: z.coerce.number().positive("Entity type ID must be a positive number"),
  height: z.coerce.number().positive("Height must be a positive number"),
  width: z.coerce.number().positive("Width must be a positive number"),
  size: z.coerce.number().positive("Size must be a positive number"),
  public_url: z.string().trim().url("Pathname is not a valid URL"),
  path: z.string().trim().nonempty("Path cannot be empty"),
  alt: z.string().trim().min(1, "Alt text is required"),
});
