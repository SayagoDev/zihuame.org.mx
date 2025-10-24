import AlliesGrid from "@/sections/allies/AlliesGrid";
import Footer from "@/sections/footer";

export default function AlliesPage() {
  return (
    <>
      <main className="min-h-screen">
        <AlliesGrid />
      </main>
      <Footer />
    </>
  );
}

export const metadata = {
  title: "Aliados - Zihuame Mochilla",
  description:
    "Zihuame Mochilla es una organización sin fines de lucro dedicada a transformar vidas a través de la educación, brindando oportunidades de desarrollo y crecimiento a comunidades vulnerables. Descubre nuestros aliados y cómo trabajamos para impactar positivamente en la sociedad.",
};
