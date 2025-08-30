import z from "zod";

export const basicInfoFormValidation = z.object({
  title: z.string().trim().nonempty("Naziv predstave je obavezan podatak."),
  identifier: z
    .string()
    .nonempty("Identifikator je obavezan podatak.")
    .regex(/^[a-z0-9-]+$/, "Dozvoljeni karakteri: a-z, 0-9 i -")
    .min(3, "Minimalan broj karaktera: 3."),
  performance_type_uid: z.coerce.number(),
  date_of_premiere: z
    .string()
    .trim()
    .nonempty("Datum upisa je obavezan podatak.")
    .refine((val) => /^\d{2}\.\s*\d{2}\.\s*\d{4}$/.test(val), {
      message: "Datum mora biti u formatu dd. mm. yyyy",
    })
    .transform((val) => {
      const match = val.match(/^(\d{2})\.\s*(\d{2})\.\s*(\d{4})$/);
      if (!match) return val;

      const [, dd, mm, yyyy] = match;
      return `${yyyy}-${mm}-${dd}`;
    })
    .refine(
      (val) => {
        const [yyyy, mm, dd] = val.split("-").map(Number);
        const date = new Date(val);

        return (
          date instanceof Date &&
          !isNaN(date.getTime()) &&
          date.getUTCFullYear() === yyyy &&
          date.getUTCMonth() + 1 === mm &&
          date.getUTCDate() === dd
        );
      },
      {
        message: "Neispravan ili nepostojeći datum.",
      }
    ),
  slogan: z.string().trim().min(6, "Minimalan broj karaktera je 6.").optional(),
});
