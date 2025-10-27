import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { Stats } from "@/sanity.types";

type Community = {
  id: string;
  name: string;
  color: string;
};

interface StatsDTO {
  year: number;
  peopleAttended: number;
  womenAttended: number;
  menAttended: number;
  separator: string;
  separatorColor: string;
  communities: Community[];
}

function mapStatsToDTO(stats: Stats): StatsDTO {
  return {
    year: stats.year || new Date().getFullYear(),
    peopleAttended: stats.totalPeople || 0,
    womenAttended: stats.womenAttended || 0,
    menAttended: stats.menAttended || 0,
    communities:
      stats.communitiesAttended?.map((community) => ({
        id: community._key,
        name: community.name || "",
        color: community.color?.hex || "",
      })) || [],
    separator: stats.separator?.symbol || "✦",
    separatorColor: stats.separator?.color?.hex || "#FDE000",
  };
}

class StatsDAL {
  async getStatsData(): Promise<StatsDTO> {
    const STATS_DATA = defineQuery(`*[_type == "stats"] | order(name asc)[0]`);

    try {
      const stats = await sanityFetch({
        query: STATS_DATA,
      });

      return mapStatsToDTO(stats.data);
    } catch (error) {
      console.error("Error fetching stats data:", error);
      return {
        year: new Date().getFullYear(),
        peopleAttended: 0,
        womenAttended: 0,
        menAttended: 0,
        separator: "✦",
        separatorColor: "#FDE000",
        communities: [],
      };
    }
  }
}

export class StatsService {
  private statsDAL: StatsDAL;

  constructor() {
    this.statsDAL = new StatsDAL();
  }

  async getStatsData(): Promise<StatsDTO> {
    return await this.statsDAL.getStatsData();
  }
}
