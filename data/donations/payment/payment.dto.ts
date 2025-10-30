import { z } from "zod";
import { PaymentStatus, PaymentMethod } from "@/types/payment";

export const PaymentSchema = z.object({
  donationId: z.string(),
  donorId: z.string(),
  stripePaymentIntentId: z.string().optional(),
  stripeSubscriptionId: z.string().optional(),
  stripeCustomerId: z.string().optional(),
  amount: z.number().min(0),
  currency: z.string().default("MXN"),
  status: z.nativeEnum(PaymentStatus),
  paymentMethod: z.nativeEnum(PaymentMethod),
  transactionFee: z.number().min(0),
  netAmount: z.number().min(0),
});

export type PaymentDTO = z.infer<typeof PaymentSchema> & {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreatePaymentDTO = z.infer<typeof PaymentSchema>;
