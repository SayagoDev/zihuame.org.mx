import { DonationFrequency } from "@/types/donation";

// Montos predefinidos
export const PRESET_AMOUNTS = [100, 150, 200, 500, 1000];

// Configuración de tarifas de Stripe
export const STRIPE_FEES = {
  DOMESTIC: {
    PERCENTAGE: 0.036, // 3.6%
    FIXED: 3, // $3 MXN
  },
  INTERNATIONAL: {
    PERCENTAGE: 0.041, // 4.1%
    FIXED: 3, // $3 MXN
  },
  TAX: 0.16, // IVA 16%
};

// Configuración de localStorage
export const STORAGE_CONFIG = {
  KEY: "donation_modal_data",
  EXPIRY_HOURS: 24,
};

// Configuración del modal
export const MODAL_CONFIG = {
  MAX_WIDTH: "lg", // max-w-lg
  ANIMATION_DURATION: 300, // ms
};

// Mensajes
export const MESSAGES = {
  SUCCESS: {
    TITLE: "¡Gracias por tu donación! 💖",
    DESCRIPTION: "Tu apoyo hace la diferencia",
  },
  ERROR: {
    TITLE: "Algo salió mal",
    DESCRIPTION: "Por favor, intenta de nuevo",
  },
};

// Programas de ejemplo básicos (los reales vienen de Sanity)
export const MOCK_PROGRAMS = [
  {
    id: "general",
    name: "Donación General",
    category: "general",
  },
  {
    id: "educacion",
    name: "Educación",
    category: "intervention",
  },
  {
    id: "salud",
    name: "Salud",
    category: "intervention",
  },
];
