import { defineType, defineField } from "sanity";

export const reportType = defineType({
  name: "report",
  title: "Reporte",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Imagen actual",
      type: "object",
      fields: [
        defineField({
          name: "img",
          title: "Imagen",
          type: "image",
          options: {
            hotspot: true,
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "shadow",
          title: "Color de sombra",
          type: "color",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      initialValue: () => `Informe ${new Date().getFullYear()}`,
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return true; // Required validation will handle this
          const pattern = /^Informe \d{4}/;
          return (
            pattern.test(value) ||
            'Debe empezar con "Informe" seguido de un año (ej: "Informe 2025")'
          );
        }),
    }),
    defineField({
      name: "pdf",
      title: "Archivo",
      type: "file",
      options: {
        accept: "application/pdf",
        storeOriginalFilename: true,
      },
      validation: (rule) =>
        rule.custom(async (value, { getClient }) => {
          // Remove this condition if the field is optional
          if (!value) {
            return "File is required";
          }

          // If the field has a value
          if (value?.asset?._ref) {
            // Query the asset's metadata document
            const client = getClient({ apiVersion: `2025-01-01` });
            // Filesize is returned in bytes
            const size = await client.fetch(`*[_id == $id][0].size`, {
              id: value.asset._ref,
            });
            // Cannot be more than 20MB
            // (adjust this number as required)
            if (size > 6000000) {
              return "El archivo debe ser menor a 6MB";
            }
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title,
      };
    },
  },
});
