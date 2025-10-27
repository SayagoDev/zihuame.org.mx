import { defineType, defineField } from "sanity";
import {} from "@sanity/icons";

export const eventType = defineType({
  name: "event",
  title: "Eventos",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Imagen",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "buttonText",
      type: "string",
      title: "Texto del Botón",
      validation: (Rule) => Rule.required().max(20),
    }),
    defineField({
      name: "buttonUrl",
      type: "url",
      title: "URL del Botón",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sponsors",
      title: "Patrocinadores",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title,
        media,
      };
    },
  },
});
