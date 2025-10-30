import AreaPageTemplate from "@/components/AreaPageTemplate";
import { InterventionService } from "@/data/intervention";
import Footer from "@/sections/footer";

export const dynamic = "force-static";

export default async function SaludPage() {
  const areaData = await new InterventionService().getInterventionBySlug(
    "salud"
  );

  console.log(
    crypto.randomUUID().slice(0, 5) +
      ` >>> Rerendered the event page cache for /${areaData.slug} <<<`
  );

  return (
    <>
      <main>
        <AreaPageTemplate areaData={areaData} />
      </main>
      <Footer />
    </>
  );
}

export const metadata = {
  title: "Salud - Zihuame Mochilla",
  description:
    "Zihuame Mochilla es una organización sin fines de lucro dedicada a transformar vidas a través de la salud, brindando oportunidades de desarrollo y crecimiento a comunidades vulnerables. Descubre nuestro trabajo en salud y cómo trabajamos para impactar positivamente en la sociedad.",
};
