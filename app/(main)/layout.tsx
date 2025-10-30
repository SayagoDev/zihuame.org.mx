import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/sections/shared/header";
import { SanityLive } from "@/sanity/lib/live";
import { EventService } from "@/data/events";
import { ClientProviders } from "@/components/providers/ClientProviders";

const gillSans = localFont({
  src: [
    {
      path: "../../public/fonts/GillSans.woff2",
      weight: "400",
      style: "regular",
    },
    {
      path: "../../public/fonts/GillSansMedium.woff2",
      weight: "500",
      style: "medium",
    },
    {
      path: "../../public/fonts/GillSansBold.woff2",
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
      path: "../../public/fonts/KometBold.woff2",
      weight: "700",
      style: "bold",
    },
    {
      path: "../../public/fonts/KometHeavy.woff2",
      weight: "800",
      style: "heavy",
    },
    {
      path: "../../public/fonts/KometBlack.woff2",
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
  title: "Zihuame Mochilla | Transformando Vidas",
  description:
    "Zihuame Mochilla es una organización sin fines de lucro dedicada a transformar vidas a través de la educación, brindando oportunidades de desarrollo y crecimiento a comunidades vulnerables.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const events = await new EventService().getEventsForNav();

  return (
    <html lang="es">
      <body
        className={`${gillSans.variable} ${komet.variable} ${inter.variable} font-gill-sans`}
      >
        <ClientProviders>
          <Header events={events} />
          {children}
          <SanityLive />
        </ClientProviders>
      </body>
    </html>
  );
}
