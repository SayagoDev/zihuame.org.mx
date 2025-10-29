import AreaPageTemplate from "@/components/AreaPageTemplate";
import { InterventionService } from "@/data/intervention";
import Footer from "@/sections/footer";

export default async function EmpoderamientoEconomicoPage() {
  const areaData = await new InterventionService().getInterventionBySlug(
    "empoderamiento-economico",
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
  title: "Empoderamiento Económico - Zihuame Mochilla",
  description:
    "Zihuame Mochilla es una organización sin fines de lucro dedicada a transformar vidas a través del empoderamiento económico, brindando oportunidades de desarrollo y crecimiento a comunidades vulnerables. Descubre nuestro trabajo en empoderamiento económico y cómo trabajamos para impactar positivamente en la sociedad.",
};
