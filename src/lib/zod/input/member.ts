import z from "zod";

export const nameValidation = z.object({
  name: z
    .string()
    .trim()
    .nonempty("Ime je obavezan podatak.")
    .regex(/^[a-zčćžšđA-ZČĆŽŠĐ\s]+$/, "Dozvoljen je samo unos latinice."),
});

export const surnameValidation = z.object({
  surname: z
    .string()
    .trim()
    .nonempty("Prezime je obavezan podatak.")
    .regex(/^[a-zčćžšđA-ZČĆŽŠĐ\s]+$/, "Dozvoljen je samo unos latinice."),
});

export const dateOfJoiningValidation = z.object({
  dateOfJoining: z
    .string()
    .trim()
    .nonempty("Datum upisa je obavezan podatak.")
    .refine((val) => /^\d{2}\.\s*\d{2}\.\s*\d{4}$/.test(val), {
      message: "Datum mora biti u formatu dd. mm. yyyy",
    })
    .transform((val) => {
      const match = val.match(/^(\d{2})\.\s*(\d{2})\.\s*(\d{4})$/)
      if (!match) return val

      const [, dd, mm, yyyy] = match
      return `${yyyy}-${mm}-${dd}`
    })
    .refine((val) => {
      const [yyyy, mm, dd] = val.split("-").map(Number)
      const date = new Date(val)

      return (
        date instanceof Date &&
        !isNaN(date.getTime()) &&
        date.getUTCFullYear() === yyyy &&
        date.getUTCMonth() + 1 === mm &&
        date.getUTCDate() === dd
      )
    }, {
      message: "Neispravan ili nepostojeći datum.",
    }),
})

