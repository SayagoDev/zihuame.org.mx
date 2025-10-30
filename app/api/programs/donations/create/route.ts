import { NextRequest, NextResponse } from "next/server";
import { donationService } from "@/data/donations/donation/donation.service";
import { CreateDonationSchema } from "@/data/donations/donation/donation.dto";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar datos
    const validatedData = CreateDonationSchema.parse(body);

    // Crear donación
    const donation = await donationService.createDonation(validatedData);

    return NextResponse.json(donation, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.issues },
        { status: 400 },
      );
    }

    console.error("Error creating donation:", error);
    return NextResponse.json(
      { error: "Error al crear donación" },
      { status: 500 },
    );
  }
}
