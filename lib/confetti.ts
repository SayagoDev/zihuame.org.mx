/**
 * Librería para manejar efectos de confetti
 * Utiliza canvas-confetti para crear efectos visuales
 */

import { useRef } from "react";

export interface ConfettiOptions {
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  scalar?: number;
  origin?: {
    x?: number;
    y?: number;
  };
}

export interface ConfettiConfig {
  count?: number;
  origin?: {
    x?: number;
    y?: number;
  };
}

/**
 * Función para disparar confetti con configuración personalizada
 */
export async function fireConfetti(
  particleRatio: number,
  options: ConfettiOptions = {},
): Promise<void> {
  // Importación dinámica para evitar SSR y cargar solo en cliente
  const { default: confetti } = (await import("canvas-confetti")) as {
    default: (opts?: any) => Promise<void> | null;
  };

  const defaults = {
    origin: { y: 0.95 },
  };

  confetti({
    ...defaults,
    ...options,
    particleCount: Math.floor((options.particleCount || 200) * particleRatio),
  });
}

/**
 * Función para crear un efecto de confetti completo con múltiples disparos
 */
export async function createConfettiEffect(
  config: ConfettiConfig = {},
): Promise<void> {
  const { count = 200, origin = { y: 0.95 } } = config;

  // Secuencia de disparos para crear un efecto más realista
  const shots = [
    {
      particleRatio: 0.25,
      options: {
        spread: 26,
        startVelocity: 55,
        particleCount: count,
        origin,
      },
    },
    {
      particleRatio: 0.2,
      options: {
        spread: 60,
        particleCount: count,
        origin,
      },
    },
    {
      particleRatio: 0.35,
      options: {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        particleCount: count,
        origin,
      },
    },
    {
      particleRatio: 0.1,
      options: {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
        particleCount: count,
        origin,
      },
    },
    {
      particleRatio: 0.1,
      options: {
        spread: 120,
        startVelocity: 45,
        particleCount: count,
        origin,
      },
    },
  ];

  // Ejecutar todos los disparos
  for (const shot of shots) {
    await fireConfetti(shot.particleRatio, shot.options);
  }
}

/**
 * Hook personalizado para manejar confetti con Intersection Observer
 */
export function useConfettiOnIntersection(
  threshold: number = 0.5,
  config: ConfettiConfig = {},
) {
  const hasFiredRef = useRef(false);

  const setupObserver = (element: HTMLElement) => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const visibleEntry = entries.find((e) => e.isIntersecting);
        if (!visibleEntry || hasFiredRef.current) return;
        hasFiredRef.current = true;

        await createConfettiEffect(config);
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  };

  return { setupObserver, hasFiredRef };
}
