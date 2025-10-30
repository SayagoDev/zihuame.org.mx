import { generateId } from "@/lib/donations/helpers";
import type { PaymentDTO, CreatePaymentDTO } from "./payment.dto";

class PaymentDAL {
  private payments: Map<string, PaymentDTO> = new Map();

  async create(data: CreatePaymentDTO): Promise<PaymentDTO> {
    const id = generateId();
    const now = new Date();

    const payment: PaymentDTO = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now,
    };

    this.payments.set(id, payment);
    this.persistToStorage();

    return payment;
  }

  async update(id: string, data: Partial<PaymentDTO>): Promise<PaymentDTO> {
    const existing = await this.findById(id);

    if (!existing) {
      throw new Error(`Payment not found: ${id}`);
    }

    const updated = { ...existing, ...data, updatedAt: new Date() };
    this.payments.set(id, updated);
    this.persistToStorage();

    return updated;
  }

  async findById(id: string): Promise<PaymentDTO | null> {
    return this.payments.get(id) || null;
  }

  async findByStripeId(stripeId: string): Promise<PaymentDTO | null> {
    for (const payment of this.payments.values()) {
      if (
        payment.stripePaymentIntentId === stripeId ||
        payment.stripeSubscriptionId === stripeId
      ) {
        return payment;
      }
    }
    return null;
  }

  async findByDonationId(donationId: string): Promise<PaymentDTO[]> {
    return Array.from(this.payments.values()).filter(
      (p) => p.donationId === donationId,
    );
  }

  private persistToStorage(): void {
    if (typeof window !== "undefined") {
      const data = Array.from(this.payments.entries());
      localStorage.setItem("payments_db", JSON.stringify(data));
    }
  }

  loadFromStorage(): void {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("payments_db");
      if (stored) {
        try {
          const data = JSON.parse(stored);
          this.payments = new Map(data);
        } catch (error) {
          console.error("Error loading payments from storage:", error);
        }
      }
    }
  }
}

export const paymentDAL = new PaymentDAL();
