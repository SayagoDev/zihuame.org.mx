"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/DonationButton";
import { useDonationState } from "../hooks/useDonationState";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe/client";
import { formatCurrency } from "@/lib/donations/helpers";
import { DonationFrequency } from "@/types/donation";
import { Loader2 } from "lucide-react";

interface PaymentStepProps {
  onSuccess: () => void;
  onError: (error: string) => void;
  onBack: () => void;
}

// Helper function to safely extract error messages
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  return "An unexpected error occurred";
};

// Componente interno para el formulario de pago
function PaymentForm({ onSuccess, onError, onBack }: PaymentStepProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { donation, donor, setLoading, isLoading } = useDonationState();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      if (donation.frequency === DonationFrequency.MONTHLY) {
        // Para suscripciones, usar confirmSetup
        const { error, setupIntent } = await stripe.confirmSetup({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/donation-success`,
          },
          redirect: "if_required",
        });

        if (error) {
          setErrorMessage(
            error.message || "Error al configurar el método de pago"
          );
          onError(error.message || "Error al configurar el método de pago");
        } else if (setupIntent?.status === "succeeded") {
          // Crear la suscripción con el payment method
          try {
            const response = await fetch("/api/payments/create-subscription", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                donation,
                donor,
                paymentMethodId: setupIntent.payment_method,
              }),
            });

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.error || "Error al crear la suscripción");
            }

            console.log("Subscription created:", data);
            onSuccess();
          } catch (error: unknown) {
            console.error("Error creating subscription:", error);
            const errorMessage = getErrorMessage(error);
            setErrorMessage(errorMessage);
            onError(errorMessage);
          }
        }
      } else {
        // Para pagos únicos, usar confirmPayment
        const { error, paymentIntent } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/donation-success`,
          },
          redirect: "if_required",
        });

        if (error) {
          setErrorMessage(error.message || "Error al procesar el pago");
          onError(error.message || "Error al procesar el pago");
        } else if (paymentIntent?.status === "succeeded") {
          onSuccess();
        }
      }
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      setErrorMessage(errorMessage);
      onError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center">
        <h2 className="text-base-content mb-2 text-2xl font-bold">
          Método de pago
        </h2>
        <p className="text-base-content/70">Transacción segura con Stripe</p>
      </div>

      {/* Resumen de donación */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h3 className="font-semibold">Resumen de tu donación</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-base-content/70">Programa:</span>
              <span className="font-medium">{donation.programName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/70">Monto:</span>
              <span className="font-medium">
                {formatCurrency(donation.finalAmount || 0)}
                {donation.frequency === DonationFrequency.MONTHLY && "/mes"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/70">Tipo:</span>
              <span className="font-medium">
                {donation.frequency === DonationFrequency.MONTHLY
                  ? "Mensual 🫶"
                  : "Única vez"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario de pago */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="card bg-base-100 border-base-300 border">
          <div className="card-body">
            <PaymentElement
              options={{
                layout: "tabs",
                paymentMethodOrder: ["card", "google_pay", "apple_pay"],
              }}
              onLoadError={(error: unknown) => {
                console.error("PaymentElement load error:", error);
                setErrorMessage(
                  "Error al cargar el formulario de pago. Por favor, recarga la página."
                );
                onError("Error al cargar el formulario de pago");
              }}
            />
          </div>
        </div>

        {errorMessage && (
          <div className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            disabled={isLoading}
            className=""
          >
            Atrás
          </Button>
          <Button
            type="submit"
            fullWidth
            disabled={!stripe || isLoading}
            loading={isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Procesando...
              </>
            ) : (
              `Donar ${formatCurrency(donation.finalAmount || 0)}`
            )}
          </Button>
        </div>
      </form>

      {/* Información de seguridad */}
      <div className="text-base-content/60 flex items-center justify-center gap-2 text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <span>Pago seguro encriptado con SSL</span>
      </div>
    </div>
  );
}

// Componente principal que envuelve el formulario con Elements
export function PaymentStep({ onSuccess, onError, onBack }: PaymentStepProps) {
  const { donation, donor } = useDonationState();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const initializedRef = useRef(false);

  const createPaymentOrSetup = useCallback(async () => {
    try {
      // Evitar llamadas duplicadas
      if (initializedRef.current) return;
      initializedRef.current = true;

      console.log("Creating payment/setup with data:");
      console.log("Donation:", donation);
      console.log("Donor:", donor);

      const isMonthly = donation.frequency === DonationFrequency.MONTHLY;
      const endpoint = isMonthly
        ? "/api/payments/create-subscription" // retorna SetupIntent si no mandamos paymentMethodId
        : "/api/payments/create-intent"; // retorna PaymentIntent

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ donation, donor }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Payment API error:", data);
        throw new Error(data.error || "Error al inicializar el pago");
      }

      // Ambos flujos entregan clientSecret (Setup o Payment)
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        // En caso extremo sin clientSecret
        throw new Error("Falta clientSecret en la respuesta del servidor");
      }
    } catch (error: unknown) {
      console.error("Payment creation error:", error);
      const errorMessage = getErrorMessage(error);
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [donation, donor, onError]);

  // Inicializar sólo una vez
  useEffect(() => {
    if (!initializedRef.current) {
      createPaymentOrSetup();
    }
  }, [createPaymentOrSetup]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="alert alert-error">
        <span>
          Error al inicializar el pago. Por favor, inténtalo de nuevo.
        </span>
      </div>
    );
  }

  const stripePromise = getStripe();

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#0066cc",
          },
        },
      }}
    >
      <PaymentForm onSuccess={onSuccess} onError={onError} onBack={onBack} />
    </Elements>
  );
}
