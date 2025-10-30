export enum DonationStep {
  CFDI = "cfdi",
  AMOUNT = "amount",
  CONVERSION = "conversion",
  DONOR = "donor",
  PAYMENT = "payment",
  SUCCESS = "success",
}

export enum DonationFrequency {
  ONCE = "once",
  MONTHLY = "monthly",
}

export interface DonationMetadata {
  [key: string]: string | number | boolean;
}
