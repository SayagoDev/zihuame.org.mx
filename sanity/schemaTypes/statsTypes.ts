import { defineType, defineField, defineArrayMember } from "sanity";
import { ChevronRightIcon } from "@sanity/icons";

export const statsType = defineType({
  name: "stats",
  title: "Sección de Estadísticas",
  type: "document",
  fields: [
    defineField({
      name: "year",
      title: "Año",
      type: "number",
    }),
    defineField({
      name: "totalPeople",
      title: "Total de Personas Atendidas",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "womenAttended",
      title: "Mujeres Atendidas",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "menAttended",
      title: "Hombres Atendidos",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "communitiesAttended",
      title: "Comunidades",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          icon: ChevronRightIcon,
          fields: [
            defineField({
              name: "name",
              title: "Nombre de la Comunidad",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "color",
              title: "Color",
              type: "color",
              options: { disableAlpha: true },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              name: "name",
              color: "color",
            },
            prepare({ name, color }) {
              return { title: name, subtitle: color.hex };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "separator",
      title: "Separador",
      type: "object",
      fields: [
        {
          type: "string",
          name: "symbol",
          title: "Simbolo",
          validation: (Rule) => Rule.required(),
        },
        {
          type: "color",
          name: "color",
          title: "Color",
          options: { disableAlpha: true },
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "totalPeople",
      subtitle: "year",
    },
    prepare({ title, subtitle }) {
      return {
        title: `${title} Personas`,
        subtitle: `Atendidas en el año ${subtitle}`,
      };
    },
  },
});
