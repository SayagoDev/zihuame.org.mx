import { defineType, defineField } from "sanity";

export const allieType = defineType({
  name: "allies",
  title: "Aliados",
  type: "document",
  fields: [
    defineField({
      name: "year",
      title: "Año",
      type: "number",
      validation: (Rule) =>
        Rule.required().min(2014).max(new Date().getFullYear()),
    }),
    defineField({
      name: "logos",
      title: "Logos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "nombre",
              title: "Nombre",
              type: "string",
            },
            {
              name: "image",
              title: "Imagen",
              type: "image",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "year",
    },
    prepare({ title }) {
      return {
        title: `Año: ${title}`,
      };
    },
  },
});
