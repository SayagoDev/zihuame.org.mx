"use client";

import { useState } from "react";
import { Button } from "@/components/ui/DonationButton";
import { useDonationState } from "../hooks/useDonationState";
import { DonorSchema } from "@/data/donations/donation/donation.dto";
import { z } from "zod";

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
        error.issues.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        console.log(newErrors);
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="animate-fade-in space-y-6 font-inter">
      <div className="text-center">
        <h2 className="text-base-content mb-2 text-2xl font-bold">Tus datos</h2>
      </div>

      <div className="space-y-4 flex flex-col">
        {/* Nombres */}
        <div className="mx-auto">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Primer Nombre</legend>
            <label
              className={`input validator ${
                errors.firstName ? "input-error" : ""
              }`}
            >
              <input
                type="text"
                minLength={1}
                maxLength={50}
                required
                placeholder="Juan"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </label>
          </fieldset>
          {errors.firstName && (
            <p className="label-text-alt text-error text-sm">
              {errors.firstName}
            </p>
          )}

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Segundo Nombre</legend>
            <label className="input">
              <input
                type="text"
                className=""
                placeholder="Carlos"
                value={formData.secondName}
                onChange={(e) => handleChange("secondName", e.target.value)}
              />
              <span className="badge badge-neutral badge-xs">Opcional</span>
            </label>
          </fieldset>

          {/* Apellidos */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Primer Apellido</legend>
            <label
              className={`input validator ${
                errors.firstName ? "input-error" : ""
              }`}
            >
              <input
                type="text"
                className=""
                minLength={1}
                required
                maxLength={50}
                placeholder="Pérez"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </label>
          </fieldset>
          {errors.lastName && (
            <p className="label-text-alt text-error text-sm">
              {errors.lastName}
            </p>
          )}

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Segundo Apellido</legend>
            <label className="input">
              <input
                type="text"
                className=""
                placeholder="García"
                value={formData.secondLastName}
                onChange={(e) => handleChange("secondLastName", e.target.value)}
              />
              <span className="badge badge-neutral badge-xs">Opcional</span>
            </label>
          </fieldset>

          {/* Email */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Correo</legend>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                placeholder="juan@gmail.com"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {errors.email && (
                <span className="badge badge-neutral badge-xs">
                  Obligatorio
                </span>
              )}
            </label>
          </fieldset>
          {errors.email && (
            <p className="label-text-alt text-error text-sm">{errors.email}</p>
          )}

          {/* Teléfono */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Teléfono</legend>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
              >
                <g fill="none">
                  <path
                    d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z"
                    fill="currentColor"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z"
                    fill="currentColor"
                  ></path>
                </g>
              </svg>
              <input
                type="tel"
                className="tabular-nums"
                required
                placeholder="Teléfono"
                pattern="^\+\d{1,3}[\s-]?(\d[\s-]?){8,10}$"
                minlength="9"
                maxlength="13"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              <span className="badge badge-neutral badge-xs">Opcional</span>
            </label>
          </fieldset>
          {errors.phone && (
            <p className="text-sm mt-0 label-text-alt text-error w-65">
              {errors.phone}
            </p>
          )}
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
