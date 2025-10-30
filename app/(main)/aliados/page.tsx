import { AllieService } from "@/data/allies";
import AlliesGrid from "@/sections/allies/AlliesGrid";
import Footer from "@/sections/footer";

export const dynamic = "force-static";

export default function AlliesPage() {
  const allies = new AllieService().getAllAllies();

  console.log(
    crypto.randomUUID().slice(0, 5) +
      ` >>> Rerendered the event page cache for /aliados <<<`
  );

  return (
    <>
      <main className="min-h-screen">
        <AlliesGrid allies={allies} />
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
