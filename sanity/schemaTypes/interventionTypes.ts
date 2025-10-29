import { defineType, defineField } from "sanity";
import { ChevronRightIcon } from "@sanity/icons";
import { defineArrayMember } from "sanity";

export const interventionType = defineType({
  name: "intervention",
  title: "Intervenciones",
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
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "peopleAttendance",
      title: "Total de personas atendidas",
      type: "number",
    }),
    defineField({
      name: "buttonText",
      type: "string",
      title: "Texto del Botón",
      validation: (Rule) => Rule.required().max(20),
    }),
    defineField({
      name: "communitiesAttended",
      title: "Comunidades",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "community" }],
        }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Galería",
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
