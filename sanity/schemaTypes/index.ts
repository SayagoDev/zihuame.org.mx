import { type SchemaTypeDefinition } from "sanity";
import { statsType } from "./statsTypes";
import { introType } from "./introTypes";
import { blockContentType } from "./blockContent";
import { eventType } from "./eventTypes";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [statsType, introType, blockContentType, eventType],
};
