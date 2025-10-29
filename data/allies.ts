import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { Allies } from "@/sanity.types";

export interface LastAllieDTO {
  name: string;
  img: string;
  href: string;
}

export interface AllieDTO {
  id: string;
  name: string;
  img: string;
  year: number;
}

function mapLastAllieToDTO(allie: Allies): LastAllieDTO[] {
  if (!allie.logos) return [];

  return allie.logos.map((logo) => ({
    name: logo.nombre || "",
    img: logo.image?.asset?.url || "",
    href: "#",
  }));
}

function mapAlliesToDTO(allies: Allies): AllieDTO[] {
  if (!allies.logos) return [];

  return allies.logos.map((logo) => ({
    id: logo._key || "",
    name: logo.nombre || "",
    img: logo.image?.asset?.url || "",
    year: allies.year || 0,
  }));
}

class AllieDAL {
  async getAllAllies(): Promise<AllieDTO[]> {
    const QUERY_ALL_ALLIES = defineQuery(
      `*[_type == "allies"]{
          year,
          logos[]{
            _key, nombre,
            image{
              asset->{
                url
              }
            }
          },
      }`,
    );
    try {
      const allies = await sanityFetch({
        query: QUERY_ALL_ALLIES,
      });

      return allies.data.flatMap(mapAlliesToDTO);
    } catch (error) {
      console.error("Error fetching allies data:", error);
      return [];
    }
  }

  async getLastAllie(): Promise<LastAllieDTO[]> {
    const QUERY_LAST_ALLIE = defineQuery(
      `
      *[_type == "allies"]{
          logos[]{
            _key, nombre,
            image{
              asset->{
                url
              }
            }
          },
      } | order(year desc)[0]
      `,
    );
    try {
      const allies = await sanityFetch({
        query: QUERY_LAST_ALLIE,
      });

      return mapLastAllieToDTO(allies.data);
    } catch (error) {
      console.error("Error fetching allies data:", error);
      return [];
    }
  }
}

export class AllieService {
  private allieDAL: AllieDAL;

  constructor() {
    this.allieDAL = new AllieDAL();
  }

  async getAllAllies(): Promise<AllieDTO[]> {
    return await this.allieDAL.getAllAllies();
  }

  async getLastAllie(): Promise<LastAllieDTO[]> {
    return await this.allieDAL.getLastAllie();
  }
}
