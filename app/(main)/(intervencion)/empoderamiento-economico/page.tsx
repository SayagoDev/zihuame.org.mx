import { AREAS_DATA } from "@/sections/areas-of-intervention/constants";
import AreaPageTemplate from "@/components/AreaPageTemplate";
import Footer from "@/sections/footer";

export default function EmpoderamientoEconomicoPage() {
  const area = AREAS_DATA.find(
    (area) => area.id === "empoderamiento-economico"
  );

  if (!area) {
    return <div>Área no encontrada</div>;
  }

  return (
    <>
      <main>
        <AreaPageTemplate area={area} />
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
