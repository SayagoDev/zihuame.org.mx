import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { imageUrl } from "@/lib/imageUrl";

// Tipos específicos para la respuesta de la query
type InterventionQueryCommunity = {
  name: string;
  color: {
    hex: string;
  };
};

type InterventionQueryGallery = {
  asset?: {
    _ref: string;
  };
  _key: string;
};

type InterventionQueryResponse = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  image?: {
    asset?: {
      _ref: string;
    };
  };
  description: string;
  buttonText: string;
  peopleAttendance?: number;
  communitiesAttended?: InterventionQueryCommunity[];
  gallery?: InterventionQueryGallery[];
};

// DTOs para la capa de presentación
type Community = {
  name: string;
  color: string;
};

type Gallery = {
  url: string;
};

export interface InterventionDTO {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  description: string;
  buttonLabel: string;
  peopleAttendance?: number;
  communities?: Community[];
  gallery?: Gallery[];
}

function mapInterventionToDTO(
  intervention: InterventionQueryResponse,
): InterventionDTO {
  return {
    id: intervention._id,
    title: intervention.name,
    slug: intervention.slug.current,
    imageUrl: intervention.image?.asset?._ref
      ? imageUrl(intervention.image.asset).url()
      : "",
    description: intervention.description,
    buttonLabel: intervention.buttonText,
    peopleAttendance: intervention.peopleAttendance,
    communities:
      intervention.communitiesAttended?.map((community) => ({
        name: community.name,
        color: community.color.hex,
      })) || [],
    gallery:
      intervention.gallery?.map((gallery) => ({
        url: gallery.asset?._ref ? imageUrl(gallery.asset).url() : "",
      })) || [],
  };
}

class InterventionDAL {
  async getInterventionBySlug(slug: string): Promise<InterventionDTO> {
    const ALL_INTERVENTIONS_QUERY = defineQuery(
      `*[_type == "intervention" && slug.current == $slug]{
      ...,
        communitiesAttended[]->{
          name,
          color{hex}
        }
      } | order(name asc)[0]`,
    );

    try {
      const interventions = await sanityFetch({
        query: ALL_INTERVENTIONS_QUERY,
        params: { slug },
      });

      return mapInterventionToDTO(
        interventions.data as InterventionQueryResponse,
      );
    } catch (error) {
      console.error("Error fetching interventions data:", error);
      return {
        id: "",
        title: "",
        slug: "",
        imageUrl: "",
        description: "",
        buttonLabel: "",
        peopleAttendance: 0,
        communities: [],
        gallery: [],
      };
    }
  }
}

export class InterventionService {
  private interventionDAL: InterventionDAL;

  constructor() {
    this.interventionDAL = new InterventionDAL();
  }

  async getInterventionBySlug(slug: string): Promise<InterventionDTO> {
    return await this.interventionDAL.getInterventionBySlug(slug);
  }
}
