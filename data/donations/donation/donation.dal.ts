import { generateId } from "@/lib/donations/helpers";
import type {
  DonationDTO,
  CreateDonationDTO,
  UpdateDonationDTO,
} from "./donation.dto";

/**
 * Simulación de base de datos en memoria
 * En producción, esto se conectaría a Neon/PostgreSQL con Prisma
 */
class DonationDAL {
  private donations: Map<string, DonationDTO> = new Map();

  /**
   * Crear donación
   */
  async create(data: DonationDTO): Promise<DonationDTO> {
    const id = generateId();
    const now = new Date();

    const donation: DonationDTO = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now,
      finalAmount: data.finalAmount,
      transactionFee: data.transactionFee,
    };

    this.donations.set(id, donation);

    // Persistir en localStorage para simular persistencia
    this.persistToStorage();

    return donation;
  }

  /**
   * Actualizar donación
   */
  async update(id: string, data: UpdateDonationDTO): Promise<DonationDTO> {
    const existing = await this.findById(id);

    if (!existing) {
      throw new Error(`Donation not found: ${id}`);
    }

    const updated: DonationDTO = {
      ...existing,
      ...data,
      updatedAt: new Date(),
    };

    this.donations.set(id, updated);
    this.persistToStorage();

    return updated;
  }

  /**
   * Buscar por ID
   */
  async findById(id: string): Promise<DonationDTO | null> {
    return this.donations.get(id) || null;
  }

  /**
   * Buscar por ID de Stripe
   */
  async findByStripeId(stripeId: string): Promise<DonationDTO | null> {
    for (const donation of this.donations.values()) {
      if (donation.metadata?.stripePaymentIntentId === stripeId) {
        return donation;
      }
    }
    return null;
  }

  /**
   * Eliminar donación
   */
  async delete(id: string): Promise<void> {
    this.donations.delete(id);
    this.persistToStorage();
  }

  /**
   * Listar todas las donaciones
   */
  async findAll(): Promise<DonationDTO[]> {
    return Array.from(this.donations.values());
  }

  /**
   * Persistir en localStorage (para desarrollo)
   */
  private persistToStorage(): void {
    if (typeof window !== "undefined") {
      const data = Array.from(this.donations.entries());
      localStorage.setItem("donations_db", JSON.stringify(data));
    }
  }

  /**
   * Cargar desde localStorage
   */
  loadFromStorage(): void {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("donations_db");
      if (stored) {
        try {
          const data = JSON.parse(stored);
          this.donations = new Map(data);
        } catch (error) {
          console.error("Error loading donations from storage:", error);
        }
      }
    }
  }
}

// Singleton
export const donationDAL = new DonationDAL();
