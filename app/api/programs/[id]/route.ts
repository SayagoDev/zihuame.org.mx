import { NextRequest, NextResponse } from "next/server";
import { programService } from "@/data/donations/program/program.service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const program = await programService.getProgram(id);
    return NextResponse.json(program);
  } catch (error) {
    console.error("Error fetching program:", error);
    return NextResponse.json(
      { error: "Programa no encontrado" },
      { status: 404 },
    );
  }
}
