import { z } from "zod";
import { DonationFrequency } from "@/types/donation";

const TEN_DIGITS_REGEX = /^\d{10}$/;
const TEN_DIGITS_ERROR = "El teléfono debe ser de 10 dígitos.";
const INTERNATIONAL_REGEX = /^\+\d{1,3}[\s-]?(\d[\s-]?){8,10}$/;
const INTERNATIONAL_ERROR =
  "Formato internacional inválido. Debe empezar con '+' seguido del código de país y el número.";
const EMPTY_STRING = z.literal("");

// Schema de Donor
export const DonorSchema = z.object({
  firstName: z
    .string()
    .min(1, "El nombre es requerido")
    .max(50, "Máximo 50 caracteres"),
  secondName: z.string().max(50).optional(),
  lastName: z
    .string()
    .min(1, "El apellido es requerido")
    .max(50, "Máximo 50 caracteres"),
  secondLastName: z.string().max(50).optional(),
  email: z.string().email("Email inválido"),
  phone: z
    .string()
    .trim()
    .optional()
    .superRefine((value, ctx) => {
      // Permitir vacío u omitido (opcional)
      if (!value || value === "") return;

      // Aceptar 10 dígitos exactos (nacional)
      if (TEN_DIGITS_REGEX.test(value)) return;

      // Aceptar formato internacional con prefijo +
      if (INTERNATIONAL_REGEX.test(value)) return;

      // Decidir mensaje según parezca intento internacional o nacional
      const looksInternational = value.trim().startsWith("+");
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: looksInternational ? INTERNATIONAL_ERROR : TEN_DIGITS_ERROR,
      });
    }),
});

// Schema de validación
export const DonationSchema = z.object({
  amount: z.number().min(1, "El monto debe ser mayor a 0").max(1000000),
  currency: z.literal("MXN"),
  frequency: z.nativeEnum(DonationFrequency),
  programId: z.string().min(1, "Debe seleccionar un programa"),
  programName: z.string().min(1),
  coverTransactionCosts: z.boolean(),
  finalAmount: z.number().min(1),
  transactionFee: z.number().min(0),
  metadata: z
    .record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
    .optional(),
});

export const CreateDonationSchema = DonationSchema.omit({
  finalAmount: true,
  transactionFee: true,
});

export const UpdateDonationSchema = DonationSchema.partial();

// Tipos inferidos de los schemas
export type DonationDTO = z.infer<typeof DonationSchema> & {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreateDonationDTO = z.infer<typeof CreateDonationSchema>;
export type UpdateDonationDTO = z.infer<typeof UpdateDonationSchema>;

export type DonorDTO = z.infer<typeof DonorSchema> & {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreateDonorDTO = z.infer<typeof DonorSchema>;
