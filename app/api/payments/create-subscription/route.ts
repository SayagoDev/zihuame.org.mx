import { NextRequest, NextResponse } from "next/server";
import { paymentService } from "@/data/donations/payment/payment.service";
import { donationService } from "@/data/donations/donation/donation.service";

// Helper function to safely extract error messages
const getErrorMessage = (error: unknown): string => {
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
    const { donation, donor, paymentMethodId } = await request.json();

    if (!donation || !donor) {
      return NextResponse.json(
        { error: "Faltan datos de donación o donante" },
        { status: 400 }
      );
    }

    // Crear donación
    const createdDonation = await donationService.createDonation(donation);

    if (paymentMethodId) {
      // Si tenemos paymentMethodId, crear la suscripción real
      const subscription = await paymentService.createSubscription(
        createdDonation,
        donor,
        paymentMethodId
      );

      return NextResponse.json({
        subscriptionId: subscription.subscriptionId,
        status: subscription.status,
        donationId: createdDonation.id,
      });
    } else {
      // Si no tenemos paymentMethodId, crear Setup Intent
      const setupIntent = await paymentService.createSetupIntent(
        createdDonation,
        donor
      );

      return NextResponse.json({
        clientSecret: setupIntent.clientSecret,
        setupIntentId: setupIntent.setupIntentId,
        donationId: createdDonation.id,
      });
    }
  } catch (error: unknown) {
    console.error("Error in subscription API:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) || "Error al procesar suscripción" },
      { status: 500 }
    );
  }
}
