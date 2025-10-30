import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/sections/shared/header";
import { SanityLive } from "@/sanity/lib/live";
import { EventService } from "@/data/events";
import { ClientProviders } from "@/components/providers/ClientProviders";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import DisableDraftMode from "@/components/DisableDraftMode";

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
  openGraph: {
    images: [
      {
        url: "/opengraph-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Zihuame Mochilla",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const events = await new EventService().getEventsForNav();

  return (
    <html lang="es">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Zihuame" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${gillSans.variable} ${komet.variable} ${inter.variable} font-gill-sans`}
      >
        {(await draftMode()).isEnabled && (
          <>
            <DisableDraftMode />
            <VisualEditing />
            <SanityLive />
          </>
        )}

        <ClientProviders>
          <Header events={events} />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
