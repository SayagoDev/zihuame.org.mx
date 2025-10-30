import { MOCK_PROGRAMS } from "@/lib/donations/constants";
import type { ProgramDTO } from "./program.dto";

class ProgramDAL {
  private programs: Map<string, ProgramDTO> = new Map();

  constructor() {
    // Inicializar con programas de ejemplo
    this.seedPrograms();
  }

  private seedPrograms(): void {
    MOCK_PROGRAMS.forEach((program) => {
      this.programs.set(program.id, program as ProgramDTO);
    });
  }

  async findAll(): Promise<ProgramDTO[]> {
    return Array.from(this.programs.values());
  }

  async findById(id: string): Promise<ProgramDTO | null> {
    return this.programs.get(id) || null;
  }

  async findActive(): Promise<ProgramDTO[]> {
    // Currently all programs are considered active; adjust when schema includes status
    return Array.from(this.programs.values());
  }

  async create(data: ProgramDTO): Promise<ProgramDTO> {
    this.programs.set(data.id, data);
    return data;
  }

  async update(id: string, data: Partial<ProgramDTO>): Promise<ProgramDTO> {
    const existing = await this.findById(id);

    if (!existing) {
      throw new Error(`Program not found: ${id}`);
    }

    const updated = { ...existing, ...data, updatedAt: new Date() };
    this.programs.set(id, updated);

    return updated;
  }
}

export const programDAL = new ProgramDAL();
