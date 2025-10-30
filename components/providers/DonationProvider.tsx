"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { DonationStep, DonationFrequency } from "@/types/donation";
import type {
  DonationDTO,
  DonorDTO,
} from "@/data/donations/donation/donation.dto";
import type { PaymentDTO } from "@/data/donations/payment/payment.dto";
import type { ProgramDTO } from "@/data/donations/program/program.dto";
import { DonationStorage } from "@/lib/storage/donation";

interface DonationModalState {
  isOpen: boolean;
  currentStep: DonationStep;
  donation: Partial<DonationDTO>;
  donor: Partial<DonorDTO>;
  payment: Partial<PaymentDTO>;
  programs: ProgramDTO[];
  completedSteps: DonationStep[];
  isLoading: boolean;
  error: string | null;
}

interface DonationModalActions {
  openModal: (config?: ModalConfig) => void;
  closeModal: () => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: DonationStep) => void;
  updateDonation: (data: Partial<DonationDTO>) => void;
  updateDonor: (data: Partial<DonorDTO>) => void;
  updatePayment: (data: Partial<PaymentDTO>) => void;
  setPrograms: (programs: ProgramDTO[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
}

interface ModalConfig {
  initialProgram?: string;
  initialAmount?: number;
}

type DonationContextType = DonationModalState & DonationModalActions;

const DonationContext = createContext<DonationContextType | undefined>(
  undefined,
);

const INITIAL_STATE: DonationModalState = {
  isOpen: false,
  currentStep: DonationStep.CFDI,
  donation: {
    currency: "MXN",
    frequency: DonationFrequency.ONCE,
    coverTransactionCosts: true,
  },
  donor: {},
  payment: {},
  programs: [],
  completedSteps: [],
  isLoading: false,
  error: null,
};

export function DonationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DonationModalState>(() => {
    // Lazy initialization with stored data
    const stored = DonationStorage.load();
    if (stored) {
      return {
        ...INITIAL_STATE,
        donor: stored.donor || INITIAL_STATE.donor,
        donation: {
          ...INITIAL_STATE.donation,
          programId: stored.program,
          amount: stored.amount,
          frequency: stored.frequency || INITIAL_STATE.donation.frequency,
        },
      };
    }
    return INITIAL_STATE;
  });

  const openModal = useCallback((config?: ModalConfig) => {
    setState((prev) => ({
      ...prev,
      isOpen: true,
      currentStep: DonationStep.CFDI,
      donation: {
        ...prev.donation,
        programId: config?.initialProgram,
        amount: config?.initialAmount,
      },
    }));
  }, []);

  const closeModal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => {
      const stepOrder: DonationStep[] = [
        DonationStep.CFDI,
        DonationStep.AMOUNT,
        DonationStep.CONVERSION,
        DonationStep.DONOR,
        DonationStep.PAYMENT,
        DonationStep.SUCCESS,
      ];

      const currentIndex = stepOrder.indexOf(prev.currentStep);
      let nextIndex = currentIndex + 1;

      // Saltar CONVERSION si es donación mensual
      if (
        stepOrder[nextIndex] === DonationStep.CONVERSION &&
        prev.donation.frequency === DonationFrequency.MONTHLY
      ) {
        nextIndex++;
      }

      const nextStep = stepOrder[nextIndex] || prev.currentStep;

      // Marcar paso actual como completado
      const newCompletedSteps = [...prev.completedSteps];
      if (!newCompletedSteps.includes(prev.currentStep)) {
        newCompletedSteps.push(prev.currentStep);
      }

      return {
        ...prev,
        currentStep: nextStep,
        completedSteps: newCompletedSteps,
      };
    });
  }, []);

  const previousStep = useCallback(() => {
    setState((prev) => {
      const stepOrder: DonationStep[] = [
        DonationStep.CFDI,
        DonationStep.AMOUNT,
        DonationStep.CONVERSION,
        DonationStep.DONOR,
        DonationStep.PAYMENT,
        DonationStep.SUCCESS,
      ];

      const currentIndex = stepOrder.indexOf(prev.currentStep);
      let prevIndex = currentIndex - 1;

      // Saltar CONVERSION al retroceder si es donación mensual
      if (
        stepOrder[prevIndex] === DonationStep.CONVERSION &&
        prev.donation.frequency === DonationFrequency.MONTHLY
      ) {
        prevIndex--;
      }

      const prevStep = stepOrder[prevIndex] || prev.currentStep;

      return {
        ...prev,
        currentStep: prevStep,
      };
    });
  }, []);

  const goToStep = useCallback((step: DonationStep) => {
    setState((prev) => ({
      ...prev,
      currentStep: step,
    }));
  }, []);

  const updateDonation = useCallback((data: Partial<DonationDTO>) => {
    setState((prev) => ({
      ...prev,
      donation: {
        ...prev.donation,
        ...data,
      },
    }));

    // Guardar en localStorage
    DonationStorage.save({
      program: data.programId,
      amount: data.amount,
      frequency: data.frequency,
    });
  }, []);

  const updateDonor = useCallback((data: Partial<DonorDTO>) => {
    setState((prev) => ({
      ...prev,
      donor: {
        ...prev.donor,
        ...data,
      },
    }));

    // Guardar en localStorage
    DonationStorage.save({
      donor: data,
    });
  }, []);

  const updatePayment = useCallback((data: Partial<PaymentDTO>) => {
    setState((prev) => ({
      ...prev,
      payment: {
        ...prev.payment,
        ...data,
      },
    }));
  }, []);

  const setPrograms = useCallback((programs: ProgramDTO[]) => {
    setState((prev) => ({
      ...prev,
      programs,
    }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState((prev) => ({
      ...prev,
      isLoading: loading,
    }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({
      ...prev,
      error,
    }));
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({
      ...prev,
      error: null,
    }));
  }, []);

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
    DonationStorage.clear();
  }, []);

  const value: DonationContextType = {
    ...state,
    openModal,
    closeModal,
    nextStep,
    previousStep,
    goToStep,
    updateDonation,
    updateDonor,
    updatePayment,
    setPrograms,
    setLoading,
    setError,
    clearError,
    reset,
  };

  return (
    <DonationContext.Provider value={value}>
      {children}
    </DonationContext.Provider>
  );
}

export function useDonationContext() {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error("useDonationContext must be used within DonationProvider");
  }
  return context;
}
