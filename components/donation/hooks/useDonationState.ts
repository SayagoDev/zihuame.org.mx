"use client";

import { useDonationContext } from "@/components/providers/DonationProvider";

export function useDonationState() {
  const context = useDonationContext();

  return {
    currentStep: context.currentStep,
    donation: context.donation,
    donor: context.donor,
    payment: context.payment,
    programs: context.programs,
    completedSteps: context.completedSteps,
    isLoading: context.isLoading,
    error: context.error,
    nextStep: context.nextStep,
    previousStep: context.previousStep,
    goToStep: context.goToStep,
    updateDonation: context.updateDonation,
    updateDonor: context.updateDonor,
    updatePayment: context.updatePayment,
    setPrograms: context.setPrograms,
    setLoading: context.setLoading,
    setError: context.setError,
    clearError: context.clearError,
    reset: context.reset,
  };
}
