"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { useContactModal } from "@/components/providers/ContactProvider";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2, "Nombre requerido, mínimo 2 caracteres"),
  email: z.email({ error: "Correo electrónico inválido" }),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[\d\s+()-]{6,20}$/.test(val), {
      message: "Teléfono inválido",
    }),
  message: z.string().min(10, "Mensaje mínimo de 10 caracteres"),
});

export function ContactModal() {
  const { isOpen, close } = useContactModal();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  }>({});

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const formData = { name, email, phone, message };
      const result = ContactSchema.safeParse(formData);
      if (!result.success) {
        const errs = result.error.flatten().fieldErrors;
        setFieldErrors({
          name: errs.name?.[0],
          email: errs.email?.[0],
          phone: errs.phone?.[0],
          message: errs.message?.[0],
        });
        return;
      }
      setFieldErrors({});
      setIsSubmitting(true);
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.error || "Error al enviar");
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Ocurrió un error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError(null);
    setFieldErrors({ name: "", email: "", phone: "", message: "" });
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    if (typeof window !== "undefined" && window.location.hash === "#contacto") {
      const url = window.location.pathname + window.location.search;
      window.history.replaceState(null, "", url);
    }
    close();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Contacto"
      className="max-w-fit"
    >
      {success ? (
        <div className="space-y-4 flex flex-col">
          <p className="text-lg text-center">
            ¡Gracias! Pronto nos pondremos en contacto.
          </p>
          <button className="btn btn-primary" onClick={handleClose}>
            Cerrar
          </button>
        </div>
      ) : (
        <div className="animate-fade-in space-y-6 font-inter">
          {error && <div className="alert alert-error">{error}</div>}
          <form className="space-y-4" onSubmit={onSubmit}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Nombre</legend>
              <label
                className={`input validator ${
                  fieldErrors.name ? "input-error" : ""
                }`}
              >
                <input
                  type="text"
                  minLength={2}
                  required
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              {fieldErrors.name && (
                <p className="label-text-alt text-error text-sm">
                  {fieldErrors.name}
                </p>
              )}
            </fieldset>

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
                  placeholder="tu@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {fieldErrors.email && (
                  <span className="badge badge-neutral badge-xs">
                    Obligatorio
                  </span>
                )}
              </label>
              {fieldErrors.email && (
                <p className="label-text-alt text-error text-sm">
                  {fieldErrors.email}
                </p>
              )}
            </fieldset>

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
                  placeholder="Teléfono"
                  pattern="^[\d\s+()-]{6,20}$"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <span className="badge badge-neutral badge-xs">Opcional</span>
              </label>
              {fieldErrors.phone && (
                <p className="text-sm mt-0 label-text-alt text-error w-65">
                  {fieldErrors.phone}
                </p>
              )}
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Mensaje</legend>
              <textarea
                className={`textarea min-h-28 ${
                  fieldErrors.message ? "textarea-error" : ""
                }`}
                placeholder="Cuéntanos cómo podemos ayudarte"
                required
                minLength={10}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {fieldErrors.message && (
                <p className="label-text-alt text-error text-sm">
                  {fieldErrors.message}
                </p>
              )}
            </fieldset>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                className="btn btn-ghost flex-1"
                onClick={handleClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-warning flex-1 text-base-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
}
