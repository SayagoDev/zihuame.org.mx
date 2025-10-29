import Heading from "@/components/Heading";
import CarouselSlider, {
  type CarouselImage,
} from "./_components/CarouselSlider";
import { EventService } from "@/data/events";

export default async function Carousel() {
  const events = await new EventService().getEventsCarouselData();
  const autoPlayInterval = 3000;

  const eventPlaceholder = [
    {
      src: "/images/event_placeholder.png",
      alt: "Imagen de placeholder para eventos",
      url: "#",
    },
  ];

  const images: CarouselImage[] = events.map((event) => ({
    src: event.imageUrl,
    alt: event.title,
    url: `/eventos/${event.slug}`,
  }));

  return (
    <section className="container max-w-full py-12 md:py-16" id="eventos">
      <Heading className="mb-8 md:mb-12">Conoce y Participa</Heading>
      {images.length > 0 ? (
        <CarouselSlider images={images} autoPlayInterval={autoPlayInterval} />
      ) : (
        <CarouselSlider
          images={eventPlaceholder}
          autoPlayInterval={autoPlayInterval}
        />
      )}
    </section>
  );
}
