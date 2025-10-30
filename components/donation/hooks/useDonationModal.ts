"use client";

import { useDonationContext } from "@/components/providers/DonationProvider";

export function useDonationModal() {
  const context = useDonationContext();

  return {
    isOpen: context.isOpen,
    openModal: context.openModal,
    closeModal: context.closeModal,
  };
}
