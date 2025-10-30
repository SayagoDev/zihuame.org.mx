import { z } from "zod";

export const ProgramSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(["general", "intervention", "event"]).default("general"),
});

export type ProgramDTO = z.infer<typeof ProgramSchema>;

export type CreateProgramDTO = z.infer<typeof ProgramSchema>;
