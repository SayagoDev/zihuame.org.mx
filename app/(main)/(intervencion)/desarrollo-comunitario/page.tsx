import AreaPageTemplate from "@/components/AreaPageTemplate";
import { InterventionService } from "@/data/intervention";
import Footer from "@/sections/footer";

export default async function DesarrolloComunitarioPage() {
  const areaData = await new InterventionService().getInterventionBySlug(
    "desarrollo-comunitario",
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
  title: "Desarrollo Comunitario - Zihuame Mochilla",
  description:
    "Zihuame Mochilla es una organización sin fines de lucro dedicada a transformar vidas a través del desarrollo comunitario, brindando oportunidades de desarrollo y crecimiento a comunidades vulnerables. Descubre nuestro trabajo en desarrollo comunitario y cómo trabajamos para impactar positivamente en la sociedad.",
};
