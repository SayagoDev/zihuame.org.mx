import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

// Tipos específicos para la respuesta de la query
type StatsQueryCommunity = {
  _key: string;
  name: string;
  color: {
    hex: string;
  };
};

type StatsQueryResponse = {
  year: number;
  totalPeople: number;
  womenAttended: number;
  menAttended: number;
  communitiesAttended: StatsQueryCommunity[];
  separator: {
    symbol: string;
    color: {
      hex: string;
    };
  };
};

type Community = {
  id: string;
  name: string;
  color: string;
};

export interface StatsDTO {
  year: number;
  peopleAttended: number;
  womenAttended: number;
  menAttended: number;
  separator: string;
  separatorColor: string;
  communities: Community[];
}

function mapStatsToDTO(stats: StatsQueryResponse): StatsDTO {
  return {
    year: stats.year,
    peopleAttended: stats.totalPeople,
    womenAttended: stats.womenAttended,
    menAttended: stats.menAttended,
    communities: stats.communitiesAttended.map((community) => ({
      id: community._key,
      name: community.name,
      color: community.color.hex,
    })),
    separator: stats.separator.symbol,
    separatorColor: stats.separator.color.hex,
  };
}

class StatsDAL {
  async getStatsData(): Promise<StatsDTO> {
    const STATS_DATA = defineQuery(`*[_type == "stats"] | order(name asc)[0]`);

    try {
      const stats = await sanityFetch({
        query: STATS_DATA,
      });

      return mapStatsToDTO(stats.data as StatsQueryResponse);
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
