import z from "zod";

export const identifierCheck = z.object({
  identifier: z
    .string()
    .nonempty("Identifikator je obavezan podatak.")
    .regex(/^[a-z0-9-]+$/, "Dozvoljeni karakteri: a-z, 0-9 i -")
    .min(6, "Minimalan broj karaktera: 6."),
});