import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { BlockContent, Event } from "@/sanity.types";
import { imageUrl } from "@/lib/imageUrl";

export interface EventDTO {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  description: BlockContent;
  buttonLabel: string;
  buttonUrl: string;
  sponsors: string[];
}

export interface EventCarouselDTO {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
}

function mapEventCarouselToDTO(event: Event): EventCarouselDTO {
  return {
    id: event._id,
    title: event.name || "",
    slug: event.slug?.current || "",
    imageUrl: event.image?.asset?._ref ? imageUrl(event.image.asset).url() : "",
  };
}

function mapEventToDTO(event: Event): EventDTO {
  return {
    id: event._id,
    title: event.name || "",
    slug: event.slug?.current || "",
    imageUrl: event.image?.asset?._ref ? imageUrl(event.image.asset).url() : "",
    description: event.description || [],
    buttonLabel: event.buttonText || "",
    buttonUrl: event.buttonUrl || "",
    sponsors:
      event.sponsors
        ?.map((sponsor) =>
          sponsor.asset?._ref ? imageUrl(sponsor.asset).url() : "",
        )
        .filter((url) => url !== "") || [],
  };
}

class EventDAL {
  async getAllEvents(): Promise<EventDTO[]> {
    const ALL_EVENTS_QUERY = defineQuery(
      `*[_type == "event"] | order(name asc)`,
    );

    try {
      const events = await sanityFetch({
        query: ALL_EVENTS_QUERY,
      });

      return events.data.map(mapEventToDTO);
    } catch (error) {
      console.error("Error fetching events data:", error);
      return [];
    }
  }

  async getEventsCarousel(): Promise<EventCarouselDTO[]> {
    const EVENT_CAROUSEL_QUERY = defineQuery(
      `*[_type == "event"]{_id,slug,image,name} | order(name asc)`,
    );

    try {
      const events = await sanityFetch({
        query: EVENT_CAROUSEL_QUERY,
      });

      return events.data.map(mapEventCarouselToDTO);
    } catch (error) {
      console.error("Error fetching event carousel data:", error);
      return [];
    }
  }

  async getEventBySlug(slug: string): Promise<EventDTO | null> {
    const EVENT_BY_SLUG_QUERY = defineQuery(
      `*[_type == "event" && slug.current == $slug][0]`,
    );

    try {
      const event = await sanityFetch({
        query: EVENT_BY_SLUG_QUERY,
        params: { slug },
      });

      return event.data ? mapEventToDTO(event.data) : null;
    } catch (error) {
      console.error("Error fetching event by slug:", error);
      return null;
    }
  }

  async getEventsForNav(): Promise<EventDTO[]> {
    const EVENTS_FOR_NAV_QUERY = defineQuery(
      `*[_type == "event"]{_id,slug,name} | order(name asc)`,
    );

    try {
      const events = await sanityFetch({
        query: EVENTS_FOR_NAV_QUERY,
      });

      return events.data.map(mapEventToDTO);
    } catch (error) {
      console.error("Error fetching events for navigation:", error);
      return [];
    }
  }
}

export class EventService {
  private eventDAL: EventDAL;

  constructor() {
    this.eventDAL = new EventDAL();
  }

  async getEventsData(): Promise<EventDTO[]> {
    return await this.eventDAL.getAllEvents();
  }

  async getEventsCarouselData(): Promise<EventCarouselDTO[]> {
    return await this.eventDAL.getEventsCarousel();
  }

  async getEventBySlug(slug: string): Promise<EventDTO | null> {
    return await this.eventDAL.getEventBySlug(slug);
  }

  async getEventsForNav(): Promise<EventDTO[]> {
    return await this.eventDAL.getEventsForNav();
  }
}
