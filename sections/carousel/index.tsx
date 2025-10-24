"use client";

import Heading from "@/components/Heading";
import CarouselSlider, {
  type CarouselImage,
} from "./_components/CarouselSlider";

interface CarouselProps {
  images?: CarouselImage[];
  autoPlayInterval?: number;
}

export default function Carousel({
  images = [
    {
      src: "/images/photo_slide.png",
      alt: "Red de Apoyo Iluminemos",
      url: "#",
    },
    {
      src: "/images/hero_images.png",
      alt: "Espacio de Familias",
    },
    {
      src: "/images/photo_slide3.png",
      alt: "Apoyo y Comunidad",
      url: "#",
    },
  ],
  autoPlayInterval = 3000,
}: CarouselProps) {
  return (
    <section className="container max-w-full py-12 md:py-16" id="eventos">
      <Heading className="mb-8 md:mb-12">Conoce y Participa</Heading>
      <CarouselSlider images={images} autoPlayInterval={autoPlayInterval} />
    </section>
  );
}
