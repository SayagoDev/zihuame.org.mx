import { type SchemaTypeDefinition } from "sanity";
import { statsType } from "./statsTypes";
import { introType } from "./introTypes";
import { blockContentType } from "./blockContent";
import { eventType } from "./eventTypes";
import { interventionType } from "./interventionTypes";
import { communityType } from "./communityTypes";
import { reportType } from "./reportTypes";
import { allieType } from "./allieTypes";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    statsType,
    introType,
    blockContentType,
    eventType,
    interventionType,
    communityType,
    reportType,
    allieType,
  ],
};
