import { defineQuery } from "next-sanity";
import type { ProgramDTO } from "./program.dto";
import { sanityFetch } from "@/sanity/lib/live";

// Query response types
type InterventionProgramResponse = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
};

type EventProgramResponse = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
};

// Mappers
function mapInterventionToProgram(
  intervention: InterventionProgramResponse
): ProgramDTO {
  return {
    id: intervention.slug.current,
    name: intervention.name,
    category: "intervention",
  };
}

function mapEventToProgram(event: EventProgramResponse): ProgramDTO {
  return {
    id: event.slug.current,
    name: event.name,
    category: "event",
  };
}

class ProgramService {
  async getAllPrograms(): Promise<ProgramDTO[]> {
    const interventions = await this.getInterventionPrograms();
    const events = await this.getEventPrograms();

    return [
      // Add general donation option
      {
        id: "general",
        name: "Donación General",
        category: "general",
      },
      ...interventions,
      ...events,
    ];
  }

  async getProgram(id: string): Promise<ProgramDTO> {
    const programs = await this.getAllPrograms();
    const program = programs.find((p) => p.id === id);

    if (!program) {
      throw new Error(`Program not found: ${id}`);
    }

    return program;
  }

  async getActivePrograms(): Promise<ProgramDTO[]> {
    // Since we simplified the DTO, all programs are considered active
    return await this.getAllPrograms();
  }

  private async getInterventionPrograms(): Promise<ProgramDTO[]> {
    const INTERVENTIONS_QUERY = defineQuery(
      `*[_type == "intervention"]{
        _id,
        name,
        slug
      } | order(name asc)`
    );

    try {
      const interventions = await sanityFetch({
        query: INTERVENTIONS_QUERY,
      });

      return interventions.data.map(
        (intervention: InterventionProgramResponse) =>
          mapInterventionToProgram(intervention)
      );
    } catch (error) {
      console.error("Error fetching interventions for programs:", error);
      return [];
    }
  }

  private async getEventPrograms(): Promise<ProgramDTO[]> {
    const EVENTS_QUERY = defineQuery(
      `*[_type == "event"]{
        _id,
        name,
        slug
      } | order(name asc)`
    );

    try {
      const events = await sanityFetch({
        query: EVENTS_QUERY,
      });

      return events.data.map((event: EventProgramResponse) =>
        mapEventToProgram(event)
      );
    } catch (error) {
      console.error("Error fetching events for programs:", error);
      return [];
    }
  }
}

export const programService = new ProgramService();
