import Heading from "@/components/Heading";
import LogoLoop from "@/components/LogoLoop";

const allies = [
  {
    alt: "Aliado 1",
    src: "/images/allies/aliado_1.png",
    href: "#",
  },
  {
    alt: "Aliado 2",
    src: "/images/allies/aliado_2.png",
    href: "#",
  },
  {
    alt: "Aliado 3",
    src: "/images/allies/aliado_3.png",
    href: "#",
  },
  {
    alt: "Aliado 4",
    src: "/images/allies/aliado_4.png",
    href: "#",
  },
  {
    alt: "Aliado 5",
    src: "/images/allies/aliado_5.png",
    href: "#",
  },
  {
    alt: "Aliado 6",
    src: "/images/allies/aliado_6.png",
    href: "#",
  },
  {
    alt: "Aliado 7",
    src: "/images/allies/aliado_7.png",
    href: "#",
  },
  {
    alt: "Aliado 8",
    src: "/images/allies/aliado_8.png",
    href: "#",
  },
];

export default function Allies() {
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
          href="#"
          className="font-medium text-warning relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-warning after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-in-out"
        >
          ¡Contáctanos!
        </a>
      </p>
    </section>
  );
}
