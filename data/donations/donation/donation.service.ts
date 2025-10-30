import { donationDAL } from "./donation.dal";
import { DonationSchema, CreateDonationSchema } from "./donation.dto";
import type {
  DonationDTO,
  CreateDonationDTO,
  UpdateDonationDTO,
} from "./donation.dto";
import {
  calculateTransactionFee,
  calculateGrossAmount,
  calculateFinalAmount,
} from "@/lib/donations/helpers";

class DonationService {
  /**
   * Crear donación
   */
  async createDonation(data: CreateDonationDTO): Promise<DonationDTO> {
    // Debug: verificar datos de entrada
    console.log("DonationService.createDonation - Input data:", data);

    // Validar entrada
    const validated = CreateDonationSchema.parse(data);
    console.log("DonationService.createDonation - Validated input:", validated);

    // Calcular tarifas
    const { finalAmount, transactionFee } = calculateFinalAmount(
      data.amount,
      data.coverTransactionCosts ?? true
    );

    // Crear donación completa
    const donationData = {
      ...validated,
      finalAmount,
      transactionFee,
    };

    console.log(
      "DonationService.createDonation - Full donation data:",
      donationData
    );

    // Validar datos completos
    const fullValidated = DonationSchema.parse(donationData);
    console.log(
      "DonationService.createDonation - Final validated data:",
      fullValidated
    );

    // Persistir
    return await donationDAL.create(fullValidated);
  }

  /**
   * Actualizar donación
   */
  async updateDonation(
    id: string,
    data: UpdateDonationDTO
  ): Promise<DonationDTO> {
    return await donationDAL.update(id, data);
  }

  /**
   * Obtener donación
   */
  async getDonation(id: string): Promise<DonationDTO> {
    const donation = await donationDAL.findById(id);

    if (!donation) {
      throw new Error(`Donation not found: ${id}`);
    }

    return donation;
  }

  /**
   * Calcular tarifa de transacción
   */
  async calculateTransactionFee(
    amount: number,
    isInternational: boolean = false
  ): Promise<number> {
    return calculateTransactionFee(amount, isInternational);
  }

  /**
   * Calcular monto bruto
   */
  async calculateGrossAmount(
    netAmount: number,
    isInternational: boolean = false
  ): Promise<number> {
    return calculateGrossAmount(netAmount, isInternational);
  }

  /**
   * Listar todas las donaciones
   */
  async getAllDonations(): Promise<DonationDTO[]> {
    return await donationDAL.findAll();
  }
}

export const donationService = new DonationService();
