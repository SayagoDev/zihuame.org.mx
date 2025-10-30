"use client";

import { Button } from "@/components/ui/DonationButton";
import { useDonationState } from "../hooks/useDonationState";
import { formatCurrency } from "@/lib/donations/helpers";
import { DonationFrequency } from "@/types/donation";
import { Heart, Mail, TrendingUp } from "lucide-react";

interface ConversionStepProps {
  onConvert: (newAmount: number, frequency: DonationFrequency) => void;
  onKeepOriginal: () => void;
  onBack: () => void;
}

export function ConversionStep({
  onConvert,
  onKeepOriginal,
  onBack,
}: ConversionStepProps) {
  const { donation } = useDonationState();
  const originalAmount = donation.amount || 100;

  const suggestionFull = originalAmount;
  const suggestionHalf = originalAmount / 2;

  return (
    <div className="animate-fade-in space-y-6">
      {/* Overlay visual */}
      <div className="text-center">
        <div className="bg-primary/10 mb-4 inline-flex rounded-full p-4">
          <Heart className="text-primary h-12 w-12" />
        </div>
        <h2 className="text-base-content mb-2 text-2xl font-bold">
          ¿Conviértete en donador mensual?
        </h2>
        <p className="text-base-content/70">
          Tu apoyo mensual nos permite planificar mejor y ayudar a más personas
        </p>
      </div>

      {/* Opciones de conversión */}
      <div className="space-y-3">
        {/* Opción 1: Mismo monto mensual */}
        <button
          onClick={() => onConvert(suggestionFull, DonationFrequency.MONTHLY)}
          className="card from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 group border-primary/30 hover:border-primary w-full cursor-pointer border-2 bg-gradient-to-r p-6 transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="bg-primary text-primary-content rounded-full p-3">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="mb-1 text-lg font-bold">
                Sí, {formatCurrency(suggestionFull)}/mes
              </h3>
              <p className="text-base-content/70 text-sm">
                Máximo impacto: Ayuda continua todos los meses
              </p>
              <p className="text-primary mt-2 text-xs font-semibold">
                Recomendado ⭐
              </p>
            </div>
          </div>
        </button>

        {/* Opción 2: Mitad del monto mensual */}
        <button
          onClick={() => onConvert(suggestionHalf, DonationFrequency.MONTHLY)}
          className="card bg-base-200 hover:bg-base-300 group w-full cursor-pointer p-6 transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="bg-secondary/20 rounded-full p-3">
              <Heart className="text-secondary h-6 w-6" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="mb-1 text-lg font-bold">
                {formatCurrency(suggestionHalf)}/mes
              </h3>
              <p className="text-base-content/70 text-sm">
                Un monto más accesible con gran impacto
              </p>
            </div>
          </div>
        </button>

        {/* Opción 3: Mantener donación única */}
        <button
          onClick={onKeepOriginal}
          className="card bg-base-100 hover:bg-base-200 border-base-300 w-full cursor-pointer border p-4 transition-colors"
        >
          <div className="text-center">
            <p className="text-base-content/70 text-sm">
              No gracias, mantener mi donación única de{" "}
              <span className="font-semibold">
                {formatCurrency(originalAmount)}
              </span>
            </p>
          </div>
        </button>
      </div>

      {/* Botón de regreso */}
      <div className="flex gap-2">
        <Button variant="ghost" onClick={onBack} size="sm">
          Atrás
        </Button>
      </div>
    </div>
  );
}
