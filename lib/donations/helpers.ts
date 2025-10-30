import { STRIPE_FEES } from "./constants";

/**
 * Calcula la tarifa de transacción de Stripe
 */
export function calculateTransactionFee(
  amount: number,
  isInternational: boolean = false
): number {
  const fees = isInternational
    ? STRIPE_FEES.INTERNATIONAL
    : STRIPE_FEES.DOMESTIC;

  const percentageFee = amount * fees.PERCENTAGE;
  const totalFee = percentageFee + fees.FIXED;
  const feeWithTax = totalFee * (1 + STRIPE_FEES.TAX);

  return Math.round(feeWithTax * 100) / 100; // Redondear a 2 decimales
}

/**
 * Calcula el monto bruto necesario para recibir un monto neto (usando fórmula Stripe + IVA sugerida por el usuario)
 */
export function calculateGrossAmount(
  desiredNetAmount: number,
  isInternational: boolean = false
): number {
  const feePercentage = isInternational ? 0.041 : 0.036;
  const fixedFee = 3;
  const iva = 0.16;

  // Porcentaje efectivo después de IVA
  const effectivePercentage = feePercentage * (1 + iva);
  const fixedWithIva = fixedFee * (1 + iva);

  // Guardar contra divisiones por cero o negativas si configuraciones erróneas
  const denominator = 1 - effectivePercentage;
  if (denominator <= 0) {
    // Fallback al método aproximado anterior
    const baseFee = desiredNetAmount * feePercentage + fixedFee;
    const ivaAmount = baseFee * iva;
    const totalFee = baseFee + ivaAmount;
    const grossAmount = desiredNetAmount + totalFee;
    return Math.round(grossAmount * 100) / 100;
  }

  const grossAmount = (desiredNetAmount + fixedWithIva) / denominator;
  return Math.round(grossAmount * 100) / 100;
}

/**
 * Calcula el monto final incluyendo costos de transacción
 */
export function calculateFinalAmount(
  amount: number,
  coverTransactionCosts: boolean,
  isInternational: boolean = false
): { finalAmount: number; transactionFee: number } {
  if (coverTransactionCosts) {
    const grossAmount = calculateGrossAmount(amount, isInternational);
    const transactionFee = grossAmount - amount;
    return {
      finalAmount: grossAmount,
      transactionFee,
    };
  } else {
    const transactionFee = calculateTransactionFee(amount, isInternational);
    return {
      finalAmount: amount,
      transactionFee,
    };
  }
}

/**
 * Formatea cantidad a pesos mexicanos
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(amount);
}

/**
 * Formatea fecha
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Genera un ID único simple
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Convierte centavos a pesos
 */
export function centsToPesos(cents: number): number {
  return cents / 100;
}

/**
 * Convierte pesos a centavos (para Stripe)
 */
export function pesosToCents(pesos: number): number {
  return Math.round(pesos * 100);
}
