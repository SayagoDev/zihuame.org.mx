"use client";

import { Button } from "@/components/ui/DonationButton";
import { FileText, X } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

const InvoiceContactSchema = z.object({
  name: z.string().min(2, "El nombre es requerido").max(60),
  email: z.email({ error: "Correo inválido" }),
  message: z.string().max(300).optional(),
});

interface CFDIStepProps {
  onNext: (needsInvoice: boolean) => void;
}

export function CFDIStep({ onNext }: CFDIStepProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n[field];
        return n;
      });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    try {
      const valid = InvoiceContactSchema.parse(formData);
      setLoading(true);
      const resp = await fetch("/api/cfdi-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(valid),
      });
      if (resp.ok) {
        setSent(true);
      } else {
        const error = await resp.json();
        setSubmitError(
          error.error ||
            "No se pudo enviar. Intenta más tarde o contáctanos por otro medio."
        );
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.issues.forEach((e) => {
          if (e.path[0]) newErrors[e.path[0] as string] = e.message;
        });
        setErrors(newErrors);
      } else {
        setSubmitError("Error inesperado. Intenta más tarde.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center">
        <h2 className="text-base-content mb-2 text-2xl font-bold">
          ¿Necesitas factura (CFDI)?
        </h2>
        <p className="text-base-content/70">
          Si requieres factura fiscal, déjanos tus datos y te contactaremos.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Botón de NO necesito CFDI: primero en mobile, segundo en desktop */}
        <button
          onClick={() => onNext(false)}
          className="card bg-base-200 hover:bg-primary/10 group hover:border-primary cursor-pointer border-2 border-transparent p-6 transition-colors flex flex-col items-center justify-center order-1 md:order-2"
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
        {/* Formulario contacto para CFDI */}
        <form
          onSubmit={handleSubmit}
          className="card bg-base-200 group p-6 flex flex-col gap-4 justify-center order-2 md:order-1"
          style={{ minHeight: "310px" }}
          autoComplete="off"
        >
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-center">
              <FileText className="text-success h-10 w-10 mb-2" />
              <div className="text-success text-lg font-bold">
                ¡Gracias! Pronto te contactamos.
              </div>
            </div>
          ) : (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Nombre completo</legend>
                <label className="input validator">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                    placeholder="Nombre completo"
                  />
                </label>
                {errors.name && (
                  <p className="label-text-alt text-error text-sm">
                    {errors.name}
                  </p>
                )}
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Correo electrónico</legend>
                <label className="input validator">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                    placeholder="correo@ejemplo.com"
                  />
                </label>
                {errors.email && (
                  <p className="label-text-alt text-error text-sm">
                    {errors.email}
                  </p>
                )}
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Comentario</legend>
                <textarea
                  className="textarea"
                  maxLength={300}
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Escribe aquí si tienes dudas o requisitos..."
                ></textarea>
                {errors.message && (
                  <p className="label-text-alt text-error text-sm">
                    {errors.message}
                  </p>
                )}
              </fieldset>
              <Button
                type="submit"
                className="w-full mt-4"
                disabled={loading}
                loading={loading}
              >
                Enviar
              </Button>
              {submitError && (
                <div className="text-error text-center text-sm mt-1">
                  {submitError}
                </div>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
}
