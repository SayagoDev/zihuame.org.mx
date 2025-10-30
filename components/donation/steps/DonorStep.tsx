"use client";

import { useState } from "react";
import { Button } from "@/components/ui/DonationButton";
import { useDonationState } from "../hooks/useDonationState";
import { DonorSchema } from "@/data/donations/donation/donation.dto";
import { z, type ZodIssue } from "zod";

interface DonorStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function DonorStep({ onNext, onBack }: DonorStepProps) {
  const { donor, updateDonor } = useDonationState();

  const [formData, setFormData] = useState({
    firstName: donor.firstName || "",
    secondName: donor.secondName || "",
    lastName: donor.lastName || "",
    secondLastName: donor.secondLastName || "",
    email: donor.email || "",
    phone: donor.phone || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpiar error del campo
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = () => {
    try {
      // Validar con Zod
      const validated = DonorSchema.parse(formData);

      // Actualizar estado
      updateDonor(validated);

      // Continuar
      onNext();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err: ZodIssue) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center">
        <h2 className="text-base-content mb-2 text-2xl font-bold">Tus datos</h2>
      </div>

      <div className="space-y-4">
        {/* Nombres */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Primer Nombre <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Juan"
              className={`input input-bordered ${
                errors.firstName ? "input-error" : ""
              }`}
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
            {errors.firstName && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.firstName}
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Segundo Nombre</span>
            </label>
            <input
              type="text"
              placeholder="Carlos"
              className="input input-bordered"
              value={formData.secondName}
              onChange={(e) => handleChange("secondName", e.target.value)}
            />
          </div>
        </div>

        {/* Apellidos */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Primer Apellido <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Pérez"
              className={`input input-bordered ${
                errors.lastName ? "input-error" : ""
              }`}
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
            {errors.lastName && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.lastName}
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Segundo Apellido</span>
            </label>
            <input
              type="text"
              placeholder="García"
              className="input input-bordered"
              value={formData.secondLastName}
              onChange={(e) => handleChange("secondLastName", e.target.value)}
            />
          </div>
        </div>

        {/* Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Email <span className="text-error">*</span>
            </span>
          </label>
          <input
            type="email"
            placeholder="juan@ejemplo.com"
            className={`input input-bordered ${
              errors.email ? "input-error" : ""
            }`}
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {errors.email && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.email}</span>
            </label>
          )}
        </div>

        {/* Teléfono */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Teléfono (opcional)</span>
          </label>
          <input
            type="tel"
            placeholder="+52 55 1234 5678"
            className={`input input-bordered ${
              errors.phone ? "input-error" : ""
            }`}
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          {errors.phone && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.phone}</span>
            </label>
          )}
          {/* <label className="label">
            <span className="label-text-alt text-base-content/60">
              Formato: +52 55 1234 5678
            </span>
          </label> */}
        </div>
      </div>

      {/* Nota de privacidad */}
      <div className="alert alert-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-current text-base-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span className="text-sm font-medium text-base-100">
          Tus datos están protegidos y solo se usan para procesar tu donación
        </span>
      </div>

      {/* Botones */}
      <div className="flex gap-2">
        <Button variant="ghost" onClick={onBack} className="flex-1">
          Atrás
        </Button>
        <Button onClick={handleSubmit} className="flex-1">
          Continuar
        </Button>
      </div>
    </div>
  );
}
