import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

// Tipos específicos para la respuesta de la query
type IntroQueryResponse = {
  mission: {
    title: string;
    description: string;
    description2?: string;
  };
  button: {
    text: string;
    url: string;
  };
};

interface IntroDTO {
  missionTitle: string;
  missionDes: string;
  missionDes2?: string;
  buttonLabel: string;
  buttonUrl: string;
}

function mapIntroToDTO(intro: IntroQueryResponse): IntroDTO {
  return {
    missionTitle: intro.mission.title,
    missionDes: intro.mission.description,
    missionDes2: intro.mission.description2,
    buttonLabel: intro.button.text,
    buttonUrl: intro.button.url,
    // year: stats.year || new Date().getFullYear(),
    // totalAttended: stats.totalPeople || 0,
    // womenAttended: stats.womenAttended || 0,
    // menAttended: stats.menAttended || 0,
    // communities:
    //   stats.communitiesAttended?.map((community) => ({
    //     id: community._key,
    //     name: community.name || "",
    //     color: community.color?.hex || "",
    //   })) || [],
    // separator: stats.separator?.symbol || "✦",
    // separatorColor: stats.separator?.color?.hex || "FDE000",
  };
}

class IntroDAL {
  async getIntroData(): Promise<IntroDTO> {
    const INTRO_DATA = defineQuery(`*[_type == "intro"] | order(name asc)[0]`);

    try {
      const introData = await sanityFetch({
        query: INTRO_DATA,
      });

      return mapIntroToDTO(introData.data as IntroQueryResponse);
    } catch (error) {
      console.error("Error fetching home data:", error);
      // Return a default HomeDTO object when there's an error
      return {
        missionTitle: "",
        missionDes: "",
        missionDes2: "",
        buttonLabel: "",
        buttonUrl: "https://zihuame.org.mx/#donar",
      };
    }
  }
}

export class IntroService {
  private introDAL: IntroDAL;

  constructor() {
    this.introDAL = new IntroDAL();
  }

  async getIntroData(): Promise<IntroDTO> {
    return await this.introDAL.getIntroData();
  }
}
