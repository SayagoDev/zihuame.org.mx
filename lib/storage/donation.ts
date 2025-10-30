import { STORAGE_CONFIG } from "@/lib/donations/constants";
import type { DonorDTO } from "@/data/donations/donation/donation.dto";
import { DonationFrequency } from "@/types/donation";

export interface StoredDonationData {
  donor: Partial<DonorDTO>;
  program: string;
  amount: number;
  frequency: DonationFrequency;
  timestamp: number;
  expiresAt: number;
}

export class DonationStorage {
  private static readonly STORAGE_KEY = STORAGE_CONFIG.KEY;
  private static readonly EXPIRY_HOURS = STORAGE_CONFIG.EXPIRY_HOURS;

  static save(data: Partial<StoredDonationData>): void {
    if (typeof window === "undefined") return;

    const now = Date.now();
    const expiresAt = now + this.EXPIRY_HOURS * 60 * 60 * 1000;

    const stored: StoredDonationData = {
      donor: data.donor || {},
      program: data.program || "",
      amount: data.amount || 0,
      frequency: data.frequency || DonationFrequency.ONCE,
      timestamp: now,
      expiresAt,
    };

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stored));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  static load(): StoredDonationData | null {
    if (typeof window === "undefined") return null;

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return null;

      const data: StoredDonationData = JSON.parse(stored);

      if (!this.isValid(data)) {
        this.clear();
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return null;
    }
  }

  static clear(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.STORAGE_KEY);
  }

  static isValid(data: StoredDonationData): boolean {
    return Date.now() < data.expiresAt;
  }
}
