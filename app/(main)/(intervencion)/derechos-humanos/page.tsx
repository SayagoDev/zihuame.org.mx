import { AREAS_DATA } from "@/sections/areas-of-intervention/constants";
import AreaPageTemplate from "@/components/AreaPageTemplate";
import Footer from "@/sections/footer";

export default function DerechosHumanosPage() {
  const area = AREAS_DATA.find((area) => area.id === "derechos-humanos");

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
  title: "Derechos Humanos - Zihuame Mochilla",
  description:
    "Zihuame Mochilla es una organización sin fines de lucro dedicada a transformar vidas a través de los derechos humanos, brindando oportunidades de desarrollo y crecimiento a comunidades vulnerables. Descubre nuestro trabajo en derechos humanos y cómo trabajamos para impactar positivamente en la sociedad.",
};
