import Heading from "@/components/Heading";
import AnnualReports from "@/sections/annual-reports";
import Footer from "@/sections/footer";
import Image from "next/image";

export default function TransparencyPage() {
  return (
    <>
      <main className="container max-w-full py-12 md:py-16 lg:py-20 xl:py-30">
        <section>
          <article className="flex flex-col items-center text-center max-w-[1200px] mx-auto">
            <h1 className="text-3xl xl:text-5xl font-komet font-extrabold">
              Nuestro Compromiso con la Transparencia
            </h1>
            <p className="text-lg leading-relaxed mt-8 xl:text-3xl text-pretty">
              En Zihuame Mochilla, la confianza es la base de nuestro trabajo.
              Creemos que la transparencia no es solo una obligación, sino una
              herramienta para mostrar cómo cada apoyo se convierte en un
              impacto real y medible. Aquí te mostramos el «porqué» y el «cómo»
              de nuestra labor.
            </p>
          </article>
          <article className="mt-8 xl:mt-30">
            <Heading>Nuestra Hipótesis de Cambio</Heading>
            <Image
              src="/images/transparency/hipotesis_de_cambio.png"
              alt="Hipótesis de Cambio"
              width={1000}
              height={1000}
              className="mt-15 mx-auto"
            />
          </article>
          <article className="mt-8 xl:mt-30">
            <Heading>Nuestro Modelo de Intervención</Heading>
            <Image
              src="/images/transparency/estructura_analitica.png"
              alt="Hipótesis de Cambio"
              width={1000}
              height={1000}
              className="mt-15 mx-auto"
            />
          </article>
        </section>
        <AnnualReports />
      </main>
      <Footer />
    </>
  );
}

export const metadata = {
  title: "Zihuame Mochilla | Transparencia",
  description:
    "Zihuame Mochilla es una organización sin fines de lucro dedicada a transformar vidas a través de la educación, brindando oportunidades de desarrollo y crecimiento a comunidades vulnerables. Descubre nuestra transparencia y cómo trabajamos para impactar positivamente en la sociedad.",
};
