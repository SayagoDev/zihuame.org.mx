import { AreaOfIntervention } from "./types";

export const AREAS_DATA: AreaOfIntervention[] = [
  {
    id: "educacion",
    src: "/images/aof-logos/educacion.svg",
    alt: "Educación Logo",
    img: "/images/desarrollo_comunitario.webp",
    title: "Educación",
    href: "/educacion",
    hrefDonate: "#",
    totalPeople: 722,
    description:
      "Brindamos una orientación educativa que constituye un recurso fundamental para planear y organizar procesos de aprendizaje con pertinencia cultural.",
    className:
      "w-[12rem] md:w-[14rem] lg:w-[16rem] xl:w-[18.75rem] object-contain",
  },
  {
    id: "desarrollo-comunitario",
    src: "/images/aof-logos/desarrollo_comunitario.svg",
    alt: "Desarrollo Comunitario Logo",
    img: "/images/desarrollo_comunitario.webp",
    title: "Desarrollo Comunitario",
    href: "/desarrollo-comunitario",
    hrefDonate: "#",
    totalPeople: 201,
    description:
      "Fomentamos el desarrollo integral de las comunidades a través de programas que fortalecen la organización social, la participación ciudadana y el bienestar colectivo.",
    className:
      "w-[12rem] md:w-[14rem] lg:w-[16rem] xl:w-[18.75rem] object-contain",
  },
  {
    id: "salud",
    src: "/images/aof-logos/salud.svg",
    alt: "Salud Logo",
    img: "/images/desarrollo_comunitario.webp",
    title: "Salud",
    href: "/salud",
    hrefDonate: "#",
    totalPeople: 1250,
    description:
      "Promovemos el acceso a servicios de salud de calidad y desarrollamos programas de prevención y educación sanitaria para mejorar el bienestar de las comunidades.",
    className:
      "w-[12rem] md:w-[14rem] lg:w-[16rem] xl:w-[18.75rem] object-contain",
  },
  {
    id: "empoderamiento-economico",
    src: "/images/aof-logos/desarrollo_economico.svg",
    alt: "Empoderamiento Económico Logo",
    img: "/images/desarrollo_comunitario.webp",
    title: "Empoderamiento Económico",
    href: "/empoderamiento-economico",
    hrefDonate: "#",
    totalPeople: 100,
    description:
      "Impulsamos el desarrollo económico local a través de programas de capacitación, emprendimiento y generación de oportunidades de empleo sostenible.",
    className:
      "w-[13rem] md:w-[14rem] lg:w-[17.5rem] xl:w-[20.5rem] object-contain translate-x-1 sm:pt-4 md:pt-0",
  },
  {
    id: "derechos-humanos",
    src: "/images/aof-logos/derechos_humanos.svg",
    alt: "Derechos Humanos Logo",
    img: "/images/desarrollo_comunitario.webp",
    totalPeople: 100,
    title: "Derechos Humanos",
    href: "/derechos-humanos",
    hrefDonate: "#",
    description:
      "Defendemos y promovemos los derechos humanos fundamentales, trabajando por la justicia social, la igualdad y la dignidad de todas las personas.",
    className:
      "w-[14.5rem] md:w-[15.5rem] lg:w-[19rem] xl:w-[23rem] object-contain -translate-x-1",
  },
];
