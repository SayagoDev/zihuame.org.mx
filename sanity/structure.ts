import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Zihuame Mochilla CMS")
    .items([
      S.documentTypeListItem("intro").title("Inicio"),
      S.documentTypeListItem("stats").title("Estadísticas"),
      S.documentTypeListItem("event").title("Eventos"),
      S.divider(),
    ]);
