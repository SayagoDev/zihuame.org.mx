import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import Image from "next/image";
import Button from "@/components/Button";
import ButtonLine from "@/components/ButtonLine";
import Footer from "@/sections/footer";
import Break from "@/components/Break";
import Header from "@/sections/shared/header";
import { EventService } from "@/data/events";
import { SanityLive } from "@/sanity/lib/live";
import "./(main)/globals.css";

const gillSans = localFont({
  src: [
    {
      path: "../public/fonts/GillSans.woff2",
      weight: "400",
      style: "regular",
    },
    {
      path: "../public/fonts/GillSansMedium.woff2",
      weight: "500",
      style: "medium",
    },
    {
      path: "../public/fonts/GillSansBold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-gill-sans",
  fallback: [
    "Gill Sans",
    "Gill Sans MT",
    "Calibri",
    "Trebuchet MS",
    "sans-serif",
  ],
});

const komet = localFont({
  src: [
    {
      path: "../public/fonts/KometBold.woff2",
      weight: "700",
      style: "bold",
    },
    {
      path: "../public/fonts/KometHeavy.woff2",
      weight: "800",
      style: "heavy",
    },
    {
      path: "../public/fonts/KometBlack.woff2",
      weight: "900",
      style: "black",
    },
  ],
  variable: "--font-komet",
  fallback: ["Arial Black", "Arial Bold", "Arial", "sans-serif"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "404 - Página no encontrada | Zihuame Mochilla",
  description:
    "La página que buscas no existe. Encuentra lo que necesitas explorando nuestras áreas de intervención y proyectos de Zihuame Mochilla.",
};

export default async function NotFound() {
  const events = await new EventService().getEventsForNav();

  return (
    <html lang="es">
      <body
        className={`${gillSans.variable} ${komet.variable} ${inter.variable} font-gill-sans`}
      >
        <Header events={events} />

        <div className="min-h-screen flex flex-col">
          {/* Contenido principal de la página 404 */}
          <main className="flex-1 flex items-center justify-center">
            <div className="container max-w-4xl mx-auto px-4 py-16 text-center">
              <div className="mb-12">
                {/* Número 404 estilizado */}
                <div className="mb-8">
                  <h1 className="font-komet text-6xl md:text-8xl lg:text-9xl text-error font-black leading-none">
                    404
                  </h1>
                  <div className="w-24 h-1 bg-error mx-auto mt-4"></div>
                </div>
              </div>

              {/* Mensaje principal */}
              <div className="mb-12 space-y-6">
                <h2 className="font-komet text-2xl md:text-3xl lg:text-4xl text-base-content font-bold">
                  ¡Oops! Página no encontrada
                </h2>

                <p className="text-base md:text-lg lg:text-xl text-base-content/80 max-w-2xl mx-auto leading-relaxed">
                  La página que buscas no existe o ha sido movida. Pero no te
                  preocupes, puedes encontrar lo que necesitas explorando
                  nuestras áreas de intervención y proyectos.
                </p>
              </div>

              {/* Botones de navegación */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button
                  href="/"
                  className="btn-primary text-primary-content font-medium"
                >
                  Ir al Inicio
                </Button>
              </div>
            </div>
          </main>

          {/* Footer */}
          <Footer />
        </div>

        <SanityLive />
      </body>
    </html>
  );
}
