"use client";

import { Button } from "@/components/ui/DonationButton";
import { FileText, X } from "lucide-react";

interface CFDIStepProps {
  onNext: (needsInvoice: boolean) => void;
}

export function CFDIStep({ onNext }: CFDIStepProps) {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center">
        <h2 className="text-base-content mb-2 text-2xl font-bold">
          ¿Necesitas factura (CFDI)?
        </h2>
        <p className="text-base-content/70">
          Si requieres factura fiscal, por favor contáctanos directamente
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Sí necesita CFDI */}
        <button
          onClick={() => {
            // Aquí podrías abrir un formulario de contacto o redirigir
            alert(
              "Por favor, contáctanos en facturas@ejemplo.com para solicitar tu CFDI",
            );
            // No cerramos el modal, el usuario puede decidir continuar sin CFDI
          }}
          className="card bg-base-200 hover:bg-base-300 group cursor-pointer p-6 transition-colors"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="bg-primary/10 group-hover:bg-primary/20 rounded-full p-4 transition-colors">
              <FileText className="text-primary h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Sí, necesito CFDI</h3>
              <p className="text-base-content/70 mt-1 text-sm">
                Te contactaremos para los datos fiscales
              </p>
            </div>
          </div>
        </button>

        {/* No necesita CFDI */}
        <button
          onClick={() => onNext(false)}
          className="card bg-base-200 hover:bg-primary/10 group hover:border-primary cursor-pointer border-2 border-transparent p-6 transition-colors"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="bg-success/10 group-hover:bg-success/20 rounded-full p-4 transition-colors">
              <X className="text-success h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">No necesito CFDI</h3>
              <p className="text-base-content/70 mt-1 text-sm">
                Continuar con mi donación
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
