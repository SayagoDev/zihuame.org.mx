import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Zihuame Mochilla CMS")
    .items([
      S.documentTypeListItem("intro").title("Inicio"),
      S.documentTypeListItem("community").title("Comunidades"),
      S.documentTypeListItem("stats").title("Estadísticas"),
      S.documentTypeListItem("event").title("Eventos"),
      S.documentTypeListItem("intervention").title("Intervenciones"),
      S.documentTypeListItem("report").title("Reportes"),
      S.documentTypeListItem("allies").title("Aliados"),
      S.divider(),
    ]);
