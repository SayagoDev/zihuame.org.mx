import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { Intervention } from "@/sanity.types";
import { imageUrl } from "@/lib/imageUrl";

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

function mapInterventionToDTO(intervention: Intervention): InterventionDTO {
  return {
    id: intervention._id,
    title: intervention.name || "",
    slug: intervention.slug?.current || "",
    imageUrl: intervention.image?.asset?._ref
      ? imageUrl(intervention.image.asset).url()
      : "",
    description: intervention.description || "",
    buttonLabel: intervention.buttonText || "",
    peopleAttendance: intervention.peopleAttendance,
    communities: intervention.communitiesAttended?.map((community) => ({
      name: community.name,
      color: community.color.hex,
    })),
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

      return mapInterventionToDTO(interventions.data);
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
