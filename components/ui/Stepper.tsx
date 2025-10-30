"use client";

import { DonationStep } from "@/types/donation";
import { cn } from "@/lib/utils";
import {
  Receipt,
  DollarSign,
  RefreshCw,
  User,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

interface StepperStep {
  id: DonationStep;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  isCompleted: boolean;
  isActive: boolean;
  isDisabled: boolean;
}

interface StepperProps {
  currentStep: DonationStep;
  completedSteps: DonationStep[];
  onStepClick?: (step: DonationStep) => void;
}

const STEP_CONFIG: Record<
  DonationStep,
  { title: string; icon: React.ComponentType<{ className?: string }> }
> = {
  [DonationStep.CFDI]: { title: "CFDI", icon: Receipt },
  [DonationStep.AMOUNT]: { title: "Monto", icon: DollarSign },
  [DonationStep.CONVERSION]: { title: "Conversión", icon: RefreshCw },
  [DonationStep.DONOR]: { title: "Datos", icon: User },
  [DonationStep.PAYMENT]: { title: "Pago", icon: CreditCard },
  [DonationStep.SUCCESS]: { title: "Éxito", icon: CheckCircle2 },
};

// Orden de los pasos visibles en el stepper (sin CONVERSION)
const VISIBLE_STEPS: DonationStep[] = [
  DonationStep.CFDI,
  DonationStep.AMOUNT,
  DonationStep.DONOR,
  DonationStep.PAYMENT,
  DonationStep.SUCCESS,
];

export function Stepper({
  currentStep,
  completedSteps,
  onStepClick,
}: StepperProps) {
  const steps: StepperStep[] = VISIBLE_STEPS.map((stepId) => {
    const config = STEP_CONFIG[stepId];
    return {
      id: stepId,
      title: config.title,
      icon: config.icon,
      isCompleted: completedSteps.includes(stepId),
      isActive: currentStep === stepId,
      isDisabled: !completedSteps.includes(stepId) && currentStep !== stepId,
    };
  });

  return (
    <div className="w-full py-4">
      <ul className="steps steps-horizontal w-full">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <li
              key={step.id}
              className={cn("step", {
                "step-primary": step.isCompleted || step.isActive,
              })}
              data-content={step.isCompleted ? "✓" : index + 1}
            >
              <div className="flex flex-col items-center gap-1">
                <Icon
                  className={cn("h-4 w-4", {
                    "text-primary": step.isActive,
                    "text-base-content/40": step.isDisabled,
                  })}
                />
                <span
                  className={cn("hidden text-xs sm:inline", {
                    "text-primary font-semibold": step.isActive,
                    "text-base-content/40": step.isDisabled,
                  })}
                >
                  {step.title}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
