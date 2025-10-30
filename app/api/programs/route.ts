import { NextResponse } from "next/server";
import { programService } from "@/data/donations/program/program.service";

export async function GET() {
  try {
    const programs = await programService.getActivePrograms();
    return NextResponse.json(programs);
  } catch (error) {
    console.error("Error fetching programs:", error);
    return NextResponse.json(
      { error: "Error al obtener programas" },
      { status: 500 },
    );
  }
}
