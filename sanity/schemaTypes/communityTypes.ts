import { defineType, defineField } from "sanity";

export const communityType = defineType({
  name: "community",
  title: "Comunidades",
  type: "document",
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
      title: "name",
      subtitle: "color.hex",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle,
      };
    },
  },
});
