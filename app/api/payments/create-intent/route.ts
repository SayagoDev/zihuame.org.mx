import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { paymentService } from "@/data/donations/payment/payment.service";
import { donationService } from "@/data/donations/donation/donation.service";

// Helper function to safely extract error messages
const getErrorMessage = (error: unknown): string => {
  if (error instanceof ZodError) {
    // Return the first field-level error message if available
    const firstIssue = error.issues?.[0];
    return firstIssue?.message || "Datos inválidos";
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  return "An unexpected error occurred";
};

export async function POST(request: NextRequest) {
  try {
    const { donation, donor } = await request.json();

    // Validar que tenemos los datos necesarios
    if (!donation || !donor) {
      return NextResponse.json(
        { error: "Faltan datos de donación o donante" },
        { status: 400 }
      );
    }

    // Crear donación en la base de datos (simulada)
    const createdDonation = await donationService.createDonation(donation);

    // Crear Payment Intent en Stripe
    const paymentIntent = await paymentService.createPaymentIntent(
      createdDonation,
      donor
    );

    return NextResponse.json({
      clientSecret: paymentIntent.clientSecret,
      paymentIntentId: paymentIntent.paymentIntentId,
      donationId: createdDonation.id,
    });
  } catch (error: unknown) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) || "Error al crear intento de pago" },
      { status: 500 }
    );
  }
}
