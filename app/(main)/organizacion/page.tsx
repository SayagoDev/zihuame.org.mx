import Footer from "@/sections/footer";
import Mission from "@/sections/mission";
import Pillars from "@/sections/pillars";

export const dynamic = "force-static";

export default function OrganizacionPage() {
  console.log(
    crypto.randomUUID().slice(0, 5) +
      ` >>> Rerendered the event page cache for /organizacion <<<`
  );

  return (
    <>
      <Pillars />
      <Mission />
      <Footer />
    </>
  );
}

export const metadata = {
  title: "Zihuame Mochilla | Organización",
  description:
    "Zihuame Mochilla es una organización sin fines de lucro dedicada a transformar vidas a través de la educación, brindando oportunidades de desarrollo y crecimiento a comunidades vulnerables. Descubre nuestra organización y cómo trabajamos para impactar positivamente en la sociedad.",
};
