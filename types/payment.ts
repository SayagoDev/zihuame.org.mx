export enum PaymentStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
  CANCELED = "canceled",
}

export enum PaymentMethod {
  CARD = "card",
  GOOGLE_PAY = "google_pay",
  APPLE_PAY = "apple_pay",
  BANK_TRANSFER = "bank_transfer",
}
