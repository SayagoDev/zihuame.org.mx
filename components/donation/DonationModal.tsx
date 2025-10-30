"use client";

import { useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Stepper } from "@/components/ui/Stepper";
import { useDonationState } from "./hooks/useDonationState";
import { useDonationModal } from "./hooks/useDonationModal";
import { DonationStep, DonationFrequency } from "@/types/donation";

// Importar todos los pasos
import { CFDIStep } from "./steps/CFDIStep";
import { AmountStep } from "./steps/AmountStep";
import { ConversionStep } from "./steps/ConversionStep";
import { DonorStep } from "./steps/DonorStep";
import { PaymentStep } from "./steps/PaymentStep";
import { SuccessStep } from "./steps/SuccessStep";
import { ProgramDTO } from "@/data/donations/program/program.dto";

interface DonationModalProps {
  initialPrograms: ProgramDTO[];
}

export function DonationModal({ initialPrograms }: DonationModalProps) {
  const { isOpen, closeModal } = useDonationModal();
  const {
    programs,
    currentStep,
    completedSteps,
    nextStep,
    previousStep,
    setPrograms,
    updateDonation,
  } = useDonationState();

  useEffect(() => {
    setPrograms(initialPrograms);
  }, [initialPrograms, setPrograms]);

  const handleCFDINext = (needsInvoice: boolean) => {
    if (needsInvoice) {
      // Aquí podrías redirigir a un formulario de contacto
      // Por ahora, solo continuamos
    }
    nextStep();
  };

  const handleConversionKeep = () => {
    // Mantener donación única y continuar
    nextStep();
  };

  const handleConversionConvert = (
    newAmount: number,
    frequency: DonationFrequency
  ) => {
    // Actualizar a donación mensual
    updateDonation({
      amount: newAmount,
      frequency,
    });
    nextStep();
  };

  const handlePaymentSuccess = () => {
    nextStep(); // Ir a SuccessStep
  };

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error);
    // Aquí podrías mostrar un toast o notificación
  };

  // Renderizar el paso actual
  const renderStep = () => {
    switch (currentStep) {
      case DonationStep.CFDI:
        return <CFDIStep onNext={handleCFDINext} />;

      case DonationStep.AMOUNT:
        return <AmountStep onNext={nextStep} onBack={previousStep} />;

      case DonationStep.CONVERSION:
        return (
          <ConversionStep
            onConvert={handleConversionConvert}
            onKeepOriginal={handleConversionKeep}
            onBack={previousStep}
          />
        );

      case DonationStep.DONOR:
        return <DonorStep onNext={nextStep} onBack={previousStep} />;

      case DonationStep.PAYMENT:
        return (
          <PaymentStep
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            onBack={previousStep}
          />
        );

      case DonationStep.SUCCESS:
        return <SuccessStep onClose={closeModal} />;

      default:
        return <CFDIStep onNext={handleCFDINext} />;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="max-w-2xl"
      showCloseButton={currentStep !== DonationStep.SUCCESS}
    >
      {/* Stepper - Solo mostrar si no es CONVERSION ni SUCCESS */}
      {currentStep !== DonationStep.CONVERSION &&
        currentStep !== DonationStep.SUCCESS && (
          <Stepper currentStep={currentStep} completedSteps={completedSteps} />
        )}

      {/* Contenido del paso actual */}
      <div className="mt-4">{renderStep()}</div>
    </Modal>
  );
}
