"use client";

import { Button } from "@/components/ui/DonationButton";
import { useDonationState } from "../hooks/useDonationState";
import { formatCurrency, formatDate } from "@/lib/donations/helpers";
import { DonationFrequency } from "@/types/donation";
import { CheckCircle2, Download, Share2, Mail } from "lucide-react";

interface SuccessStepProps {
  onClose: () => void;
}

export function SuccessStep({ onClose }: SuccessStepProps) {
  const { donation, donor, reset } = useDonationState();

  const handleDownloadReceipt = () => {
    // Aquí implementarías la descarga del recibo
    alert("Funcionalidad de descarga de recibo - Por implementar");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Icono de éxito */}
      <div className="text-center">
        <div className="bg-success/10 mb-4 inline-flex rounded-full p-6">
          <CheckCircle2 className="text-success h-16 w-16" />
        </div>
        <h2 className="text-base-content mb-2 text-3xl font-bold">
          ¡Gracias por tu donación! 💖
        </h2>
        <p className="text-base-content/70 text-lg">
          Tu apoyo hace la diferencia
        </p>
      </div>

      {/* Detalles de la donación */}
      <div className="card from-primary/10 to-success/10 border-primary/20 border bg-gradient-to-br">
        <div className="card-body">
          <h3 className="mb-4 text-lg font-bold">Detalles de tu donación</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-base-content/70">Monto:</span>
              <span className="text-primary text-2xl font-bold">
                {formatCurrency(donation.finalAmount || 0)}
                {donation.frequency === DonationFrequency.MONTHLY && (
                  <span className="text-base font-normal">/mes</span>
                )}
              </span>
            </div>
            <div className="divider my-1"></div>
            <div className="flex justify-between">
              <span className="text-base-content/70">Programa:</span>
              <span className="font-medium">{donation.programName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/70">Tipo:</span>
              <span className="font-medium">
                {donation.frequency === DonationFrequency.MONTHLY
                  ? "Donación Mensual 🫶"
                  : "Donación Única"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/70">Fecha:</span>
              <span className="font-medium">{formatDate(new Date())}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/70">Email:</span>
              <span className="font-medium">{donor.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Información adicional para donaciones mensuales */}
      {donation.frequency === DonationFrequency.MONTHLY && (
        <div className="alert alert-info text-base-100">
          <Mail className="h-5 w-5" />
          <div className="text-sm">
            <p className="font-semibold">Donación mensual activada</p>
            <p className="mt-1">
              Recibirás un recibo automático cada mes. Puedes cancelar en
              cualquier momento envianos un correo a{" "}
              <a href="mailto:info@zihuame.org.mx">info@zihuame.org.mx</a>
            </p>
          </div>
        </div>
      )}

      {/* Mensaje de agradecimiento personalizado */}
      <div className="card bg-base-200">
        <div className="card-body">
          <p className="text-base-content/80 text-center italic">
            "Gracias a personas como tú, podemos seguir transformando vidas. Tu
            generosidad será utilizada para <em>{donation.programName}</em> y
            crear un impacto positivo en nuestra comunidad."
          </p>
          <p className="mt-2 text-right text-sm font-medium">
            - Equipo de {process.env.NEXT_PUBLIC_APP_NAME}
          </p>
        </div>
      </div>

      {/* Acciones */}
      <div className="space-y-2">
        <Button onClick={handleClose} fullWidth size="lg">
          Cerrar
        </Button>
      </div>

      {/* Nota final */}
      <p className="text-base-content/60 text-center text-sm">
        Hemos enviado un recibo a <strong>{donor.email}</strong>
      </p>
    </div>
  );
}
