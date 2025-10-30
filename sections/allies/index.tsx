import Heading from "@/components/Heading";
import LogoLoop from "@/components/LogoLoop";
import { AllieService } from "@/data/allies";

export default async function Allies() {
  const alliesData = await new AllieService().getLastAllie();

  const allies = alliesData.map((allie) => ({
    alt: allie.name,
    src: allie.img,
    href: allie.href,
  }));

  return (
    <section className="py-12" id="allies">
      <Heading className="">Nuestros Aliados y Aliadas</Heading>
      <div className="py-12 md:py-16 flex flex-col items-center gap-6 md:gap-10 xl:gap-16">
        <LogoLoop
          logos={allies}
          speed={40}
          direction="left"
          logoHeight={90}
          gap={42}
          pauseOnHover={true}
          fadeOut={true}
          fadeOutColor="#F6F4EF"
        />
      </div>
      <p className="text-xl text-center md:text-2xl xl:text-3xl">
        ¿Quieres sumarte a nuestra causa?{" "}
        <a
          href="#contacto"
          className="font-medium text-warning relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-warning after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-in-out"
        >
          ¡Contáctanos!
        </a>
      </p>
    </section>
  );
}
