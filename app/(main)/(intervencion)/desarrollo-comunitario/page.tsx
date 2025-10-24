import { AREAS_DATA } from "@/sections/areas-of-intervention/constants";
import AreaPageTemplate from "@/components/AreaPageTemplate";
import Footer from "@/sections/footer";

export default function DesarrolloComunitarioPage() {
  const area = AREAS_DATA.find((area) => area.id === "desarrollo-comunitario");

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
  title: "Desarrollo Comunitario - Zihuame Mochilla",
  description:
    "Zihuame Mochilla es una organización sin fines de lucro dedicada a transformar vidas a través del desarrollo comunitario, brindando oportunidades de desarrollo y crecimiento a comunidades vulnerables. Descubre nuestro trabajo en desarrollo comunitario y cómo trabajamos para impactar positivamente en la sociedad.",
};
