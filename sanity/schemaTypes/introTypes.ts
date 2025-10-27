import { defineType, defineField } from "sanity";
import {} from "@sanity/icons";

export const introType = defineType({
  name: "intro",
  title: "Sección de Introducción",
  type: "document",
  fields: [
    defineField({
      name: "mission",
      title: "Misión",
      type: "object",
      fieldsets: [{ name: "mission", title: "Misión" }],
      hidden: false,
      options: {
        collapsible: true,
        collapsed: false,
        columns: 1,
        modal: { type: "popover" },
      },
      fields: [
        {
          name: "title",
          type: "string",
          title: "Título",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "description",
          type: "text",
          rows: 6,
          title: "Descripción",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "description2",
          type: "text",
          rows: 6,
          title: "Descripción 2",
        },
      ],
    }),
    defineField({
      name: "button",
      title: "Botón",
      type: "object",
      fields: [
        {
          name: "text",
          type: "string",
          title: "Texto del Botón",
          validation: (Rule) => Rule.required().max(20),
        },
        {
          name: "url",
          type: "url",
          title: "url",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "mission.title",
      subtitle: "button.text",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle,
      };
    },
  },
});
