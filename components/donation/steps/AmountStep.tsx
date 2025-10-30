"use client";

import { useState } from "react";
import { Button } from "@/components/ui/DonationButton";
import { useDonationState } from "../hooks/useDonationState";
import { DonationFrequency } from "@/types/donation";
import { PRESET_AMOUNTS } from "@/lib/donations/constants";
import { formatCurrency, calculateFinalAmount } from "@/lib/donations/helpers";
import { Heart, DollarSign } from "lucide-react";

interface AmountStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function AmountStep({ onNext, onBack }: AmountStepProps) {
  const { donation, programs, updateDonation } = useDonationState();

  const [amount, setAmount] = useState(donation.amount || 0);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(
    donation.programId || ""
  );
  const [frequency, setFrequency] = useState(
    donation.frequency || DonationFrequency.ONCE
  );
  const [coverCosts, setCoverCosts] = useState(
    donation.coverTransactionCosts ?? true
  );

  const selectedProgramData = programs.find((p) => p.id === selectedProgram);

  // Calcular monto final solo si amount es válido (>0)
  const shouldCalculate = amount > 0;
  const { finalAmount, transactionFee } = shouldCalculate
    ? calculateFinalAmount(amount, coverCosts)
    : { finalAmount: 0, transactionFee: 0 };

  const handleAmountClick = (value: number) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setAmount(numValue);
    }
  };

  const handleContinue = () => {
    if (!selectedProgram) {
      alert("Por favor selecciona un programa");
      return;
    }

    if (amount < 100) {
      alert("El monto mínimo es $100 MXN");
      return;
    }

    if (!selectedProgramData) {
      console.error("No se encontró información del programa seleccionado");
      alert("Error: No se encontró información del programa seleccionado");
      return;
    }

    if (!selectedProgramData.name || selectedProgramData.name.trim() === "") {
      console.error("El nombre del programa está vacío");
      alert("Error: El nombre del programa está vacío");
      return;
    }

    updateDonation({
      amount,
      programId: selectedProgram,
      programName: selectedProgramData.name,
      frequency,
      coverTransactionCosts: coverCosts,
      finalAmount,
      transactionFee,
    });

    onNext();
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center">
        <h2 className="text-base-content mb-2 text-2xl font-bold">
          Selecciona tu donación
        </h2>
        <p className="text-base-content/70">Cada aporte hace la diferencia</p>
      </div>

      {/* Selector de Programa */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Programa</span>
        </label>
        <select
          value={selectedProgram}
          onChange={(e) => setSelectedProgram(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="">Selecciona un programa</option>
          {programs.map((program) => (
            <option key={program.id} value={program.id}>
              {program.name}
            </option>
          ))}
        </select>
      </div>

      {/* Toggle de Frecuencia */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Frecuencia</span>
        </label>
        <div className="join w-full">
          <button
            onClick={() => setFrequency(DonationFrequency.ONCE)}
            className={`btn join-item flex-1 ${
              frequency === DonationFrequency.ONCE ? "btn-primary" : "btn-ghost"
            }`}
          >
            <DollarSign className="h-4 w-4" />
            Una vez
          </button>
          <button
            onClick={() => setFrequency(DonationFrequency.MONTHLY)}
            className={`btn join-item flex-1 ${
              frequency === DonationFrequency.MONTHLY
                ? "btn-primary"
                : "btn-ghost"
            }`}
          >
            <Heart className="h-4 w-4" />
            Mensual
          </button>
        </div>
      </div>

      {/* Montos Predefinidos */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Monto</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {PRESET_AMOUNTS.map((presetAmount) => (
            <button
              key={presetAmount}
              onClick={() => handleAmountClick(presetAmount)}
              className={`btn ${
                amount === presetAmount && !customAmount
                  ? "btn-primary"
                  : "btn-outline"
              }`}
            >
              ${presetAmount}
            </button>
          ))}
        </div>
      </div>

      {/* Monto Personalizado */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Monto personalizado</span>
        </label>
        <div className="join w-full">
          <span className="btn join-item">$</span>
          <input
            type="number"
            placeholder="Ingresa cantidad"
            className="input input-bordered join-item w-full"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            min="10"
          />
          <span className="btn join-item">MXN</span>
        </div>
      </div>

      {/* Cubrir Costos */}
      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-4">
          <input
            type="checkbox"
            checked={coverCosts}
            onChange={(e) => setCoverCosts(e.target.checked)}
            className="checkbox checkbox-primary"
          />
          <div className="flex-1">
            <span className="label-text font-medium">
              Cubrir costos de transacción
            </span>
            {/* Solo muestra el costo si amount > 0 y coverCosts está activo */}
            {coverCosts && shouldCalculate && (
              <p className="text-base-content/70 mt-1 text-xs">
                +{formatCurrency(transactionFee)} para que el 100% de tu
                donación llegue
              </p>
            )}
          </div>
        </label>
      </div>

      {/* Resumen */}
      <div className="card bg-primary/5 border-primary/20 border">
        <div className="card-body">
          <h3 className="text-lg font-semibold">Resumen</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-base-content/70">Donación:</span>
              <span className="font-semibold">
                {formatCurrency(shouldCalculate ? amount : 0)}
                {shouldCalculate &&
                  frequency === DonationFrequency.MONTHLY &&
                  "/mes"}
              </span>
            </div>
            {/* Muestra costos sólo si coverCosts y hay monto válido */}
            {coverCosts && shouldCalculate && (
              <div className="flex justify-between text-sm">
                <span className="text-base-content/70">Costos:</span>
                <span>{formatCurrency(transactionFee)}</span>
              </div>
            )}
            <div className="divider my-1"></div>
            <div className="flex justify-between text-lg">
              <span className="font-bold">Total:</span>
              <span className="text-primary font-bold">
                {formatCurrency(shouldCalculate ? finalAmount : 0)}
                {shouldCalculate &&
                  frequency === DonationFrequency.MONTHLY &&
                  "/mes"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-2">
        <Button variant="ghost" onClick={onBack} className="flex-1">
          Atrás
        </Button>
        <Button onClick={handleContinue} className="flex-1">
          Continuar
        </Button>
      </div>
    </div>
  );
}
