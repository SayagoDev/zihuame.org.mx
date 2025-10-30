import Stripe from "stripe";
import { paymentDAL } from "./payment.dal";

import type { PaymentDTO, CreatePaymentDTO } from "./payment.dto";
import type { DonationDTO } from "../donation/donation.dto";
import type { DonorDTO } from "../donation/donation.dto";
import { PaymentStatus, PaymentMethod } from "@/types/payment";
import { pesosToCents } from "@/lib/donations/helpers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

class PaymentService {
  /**
   * Crear Payment Intent para pago único
   */
  async createPaymentIntent(
    donation: DonationDTO,
    donor: DonorDTO
  ): Promise<{ clientSecret: string; paymentIntentId: string }> {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: pesosToCents(donation.finalAmount),
        currency: donation.currency.toLowerCase(),
        metadata: {
          donationId: donation.id || "pending",
          programId: donation.programId,
          programName: donation.programName,
          donorEmail: donor.email,
          donorName: `${donor.firstName} ${donor.lastName}`,
        },
        description: `Donación a ${donation.programName}`,
        receipt_email: donor.email,
      });

      return {
        clientSecret: paymentIntent.client_secret!,
        paymentIntentId: paymentIntent.id,
      };
    } catch (error) {
      console.error("Error creating payment intent:", error);
      throw new Error("No se pudo crear el intento de pago");
    }
  }

  /**
   * Crear Setup Intent para suscripción mensual
   * Esto permite al usuario proporcionar su método de pago
   */
  async createSetupIntent(
    donation: DonationDTO,
    donor: DonorDTO
  ): Promise<{ clientSecret: string; setupIntentId: string }> {
    try {
      // 1. Crear o recuperar cliente
      let customer: Stripe.Customer;

      const existingCustomers = await stripe.customers.list({
        email: donor.email,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
      } else {
        customer = await stripe.customers.create({
          email: donor.email,
          name: `${donor.firstName} ${donor.lastName}`,
          phone: donor.phone,
          metadata: {
            donorId: donor.id || "pending",
          },
        });
      }

      // 2. Crear Setup Intent
      const setupIntent = await stripe.setupIntents.create({
        customer: customer.id,
        payment_method_types: ["card"],
        usage: "off_session",
        metadata: {
          donationId: donation.id || "pending",
          programId: donation.programId,
          programName: donation.programName,
          donorEmail: donor.email,
          donorName: `${donor.firstName} ${donor.lastName}`,
        },
      });

      return {
        clientSecret: setupIntent.client_secret!,
        setupIntentId: setupIntent.id,
      };
    } catch (error) {
      console.error("Error creating setup intent:", error);
      throw new Error("No se pudo crear el setup intent");
    }
  }

  /**
   * Crear Suscripción después de que el usuario haya proporcionado el método de pago
   */
  async createSubscription(
    donation: DonationDTO,
    donor: DonorDTO,
    paymentMethodId: string
  ): Promise<{
    subscriptionId: string;
    clientSecret?: string;
    status: string;
  }> {
    try {
      // 1. Crear o recuperar cliente
      let customer: Stripe.Customer;

      const existingCustomers = await stripe.customers.list({
        email: donor.email,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
      } else {
        customer = await stripe.customers.create({
          email: donor.email,
          name: `${donor.firstName} ${donor.lastName}`,
          phone: donor.phone,
          metadata: {
            donorId: donor.id || "pending",
          },
        });
      }

      // 2. Adjuntar método de pago
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customer.id,
      });

      // 3. Establecer como método de pago por defecto
      await stripe.customers.update(customer.id, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });

      // 4. Crear o recuperar producto
      const productId = `donation-${donation.programId}`;
      let product: Stripe.Product;

      try {
        product = await stripe.products.retrieve(productId);
      } catch {
        product = await stripe.products.create({
          id: productId,
          name: `Donación Mensual - ${donation.programName}`,
          description: `Donación recurrente al programa ${donation.programName}`,
        });
      }

      // 5. Crear precio (price) recurrente
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: pesosToCents(donation.finalAmount),
        currency: donation.currency.toLowerCase(),
        recurring: {
          interval: "month",
        },
      });

      // 6. Crear suscripción
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: price.id }],
        payment_settings: {
          payment_method_types: ["card"],
          save_default_payment_method: "on_subscription",
        },
        expand: ["latest_invoice.payment_intent"],
        metadata: {
          donationId: donation.id || "pending",
          programId: donation.programId,
          programName: donation.programName,
        },
      });

      return {
        subscriptionId: subscription.id,
        clientSecret: undefined, // Para suscripciones, no necesitamos client_secret
        status: subscription.status,
      };
    } catch (error) {
      console.error("Error creating subscription:", error);
      throw new Error("No se pudo crear la suscripción");
    }
  }

  /**
   * Confirmar pago
   */
  async confirmPayment(paymentIntentId: string): Promise<PaymentDTO> {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );

      const paymentData: CreatePaymentDTO = {
        donationId: paymentIntent.metadata.donationId,
        donorId: paymentIntent.metadata.donorId || "unknown",
        stripePaymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency.toUpperCase(),
        status: this.mapStripeStatus(paymentIntent.status),
        paymentMethod: PaymentMethod.CARD,
        transactionFee: 0, // Calcular si es necesario
        netAmount: paymentIntent.amount / 100,
      };

      return await paymentDAL.create(paymentData);
    } catch (error) {
      console.error("Error confirming payment:", error);
      throw new Error("No se pudo confirmar el pago");
    }
  }

  /**
   * Obtener estado de pago
   */
  async getPaymentStatus(paymentIntentId: string): Promise<PaymentStatus> {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );
      return this.mapStripeStatus(paymentIntent.status);
    } catch (error) {
      console.error("Error getting payment status:", error);
      throw new Error("No se pudo obtener el estado del pago");
    }
  }

  /**
   * Mapear estado de Stripe a nuestro enum
   */
  private mapStripeStatus(stripeStatus: string): PaymentStatus {
    const statusMap: Record<string, PaymentStatus> = {
      processing: PaymentStatus.PROCESSING,
      requires_payment_method: PaymentStatus.PENDING,
      requires_confirmation: PaymentStatus.PENDING,
      requires_action: PaymentStatus.PENDING,
      succeeded: PaymentStatus.SUCCEEDED,
      canceled: PaymentStatus.CANCELED,
    };

    return statusMap[stripeStatus] || PaymentStatus.FAILED;
  }

  /**
   * Manejar webhook de Stripe
   */
  async handleWebhook(event: Stripe.Event): Promise<void> {
    switch (event.type) {
      case "payment_intent.succeeded":
        await this.handlePaymentIntentSucceeded(
          event.data.object as Stripe.PaymentIntent
        );
        break;
      case "payment_intent.payment_failed":
        await this.handlePaymentIntentFailed(
          event.data.object as Stripe.PaymentIntent
        );
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await this.handleSubscriptionUpdated(
          event.data.object as Stripe.Subscription
        );
        break;
      case "invoice.payment_succeeded":
        await this.handleInvoicePaymentSucceeded(
          event.data.object as Stripe.Invoice
        );
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  }

  private async handlePaymentIntentSucceeded(
    paymentIntent: Stripe.PaymentIntent
  ): Promise<void> {
    console.log("Payment Intent succeeded:", paymentIntent.id);
    // Actualizar estado en base de datos si existe
    const existing = await paymentDAL.findByStripeId(paymentIntent.id);
    if (existing) {
      await paymentDAL.update(existing.id!, {
        status: PaymentStatus.SUCCEEDED,
      });
    }
  }

  private async handlePaymentIntentFailed(
    paymentIntent: Stripe.PaymentIntent
  ): Promise<void> {
    console.log("Payment Intent failed:", paymentIntent.id);
    const existing = await paymentDAL.findByStripeId(paymentIntent.id);
    if (existing) {
      await paymentDAL.update(existing.id!, {
        status: PaymentStatus.FAILED,
      });
    }
  }

  private async handleSubscriptionUpdated(
    subscription: Stripe.Subscription
  ): Promise<void> {
    console.log("Subscription updated:", subscription.id);
    // Lógica adicional de suscripciones
  }

  private async handleInvoicePaymentSucceeded(
    invoice: Stripe.Invoice
  ): Promise<void> {
    console.log("Invoice payment succeeded:", invoice.id);
    // Lógica adicional de facturas
  }
}

export const paymentService = new PaymentService();
