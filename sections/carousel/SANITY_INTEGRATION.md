# Integración del Carrusel con Sanity CMS - Áreas de Intervención

Esta documentación explica cómo integrar el componente de carrusel con Sanity CMS usando el concepto de "Áreas de Intervención" para garantizar coherencia entre contenido y navegación.

## Concepto: Áreas de Intervención

### Filosofía del Sistema

- **Primero**: Crear "Áreas de Intervención" en Sanity
- **Segundo**: Opcionalmente agregar imágenes al carrusel que apunten a esas áreas
- **Resultado**: Sistema coherente donde cada URL interna garantiza una página existente

### Ventajas

✅ **Coherencia**: Cada URL interna garantiza una página existente  
✅ **Flexibilidad**: No todas las áreas necesitan estar en el carrusel  
✅ **Escalabilidad**: Puedes tener 20 áreas pero solo 5 en el carrusel  
✅ **Mantenimiento**: Cambios en áreas se reflejan automáticamente  
✅ **SEO**: Páginas dedicadas para cada área de intervención

## Esquemas de Sanity

### 1. Esquema de Área de Intervención

```javascript
// schemas/interventionArea.js
export default {
  name: "interventionArea",
  title: "Área de Intervención",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Título del Área",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Descripción Corta",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "content",
      title: "Contenido Principal",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
        },
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    },
    {
      name: "featuredImage",
      title: "Imagen Destacada",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "isActive",
      title: "Área Activa",
      type: "boolean",
      initialValue: true,
      description: "Desmarcar para ocultar esta área del sitio",
    },
    {
      name: "order",
      title: "Orden de Visualización",
      type: "number",
      initialValue: 0,
      description: "Número para ordenar las áreas (menor = primero)",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "featuredImage",
    },
  },
  orderings: [
    {
      title: "Orden Personalizado",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
};
```

### 2. Esquema de Carrusel (Modificado)

```javascript
// schemas/carousel.js
export default {
  name: "carousel",
  title: "Carrusel",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Título de la Sección",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slides",
      title: "Imágenes del Carrusel",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Imagen",
              type: "image",
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "alt",
              title: "Texto Alternativo",
              type: "string",
              validation: (Rule) => Rule.required().max(125),
            },
            {
              name: "linkType",
              title: "Tipo de Enlace",
              type: "string",
              options: {
                list: [
                  { title: "Área de Intervención", value: "internal" },
                  { title: "URL Externa", value: "external" },
                  { title: "Sin Enlace", value: "none" },
                ],
                layout: "radio",
              },
              initialValue: "none",
            },
            {
              name: "interventionArea",
              title: "Área de Intervención",
              type: "reference",
              to: [{ type: "interventionArea" }],
              options: {
                filter: "isActive == true",
              },
              hidden: ({ parent }) => parent?.linkType !== "internal",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const { parent } = context;
                  if (parent?.linkType === "internal" && !value) {
                    return "Debe seleccionar un área de intervención";
                  }
                  return true;
                }),
            },
            {
              name: "externalUrl",
              title: "URL Externa",
              type: "url",
              hidden: ({ parent }) => parent?.linkType !== "external",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const { parent } = context;
                  if (parent?.linkType === "external" && !value) {
                    return "Debe proporcionar una URL externa";
                  }
                  return true;
                }),
            },
            {
              name: "isActive",
              title: "Slide Activo",
              type: "boolean",
              initialValue: true,
            },
          ],
          preview: {
            select: {
              title: "alt",
              media: "image",
              subtitle: "linkType",
            },
            prepare({ title, media, subtitle }) {
              const linkTypeLabels = {
                internal: "Área de Intervención",
                external: "URL Externa",
                none: "Sin Enlace",
              };
              return {
                title,
                media,
                subtitle: linkTypeLabels[subtitle] || "Sin Enlace",
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(10),
    },
    {
      name: "autoPlayInterval",
      title: "Intervalo de Auto-reproducción (ms)",
      type: "number",
      initialValue: 3000,
      validation: (Rule) => Rule.min(1000).max(10000),
    },
    {
      name: "isActive",
      title: "Sección Activa",
      type: "boolean",
      initialValue: true,
    },
  ],
};
```

## Servicios de Sanity

### 1. Servicio de Áreas de Intervención

```typescript
// lib/sanity/interventionAreaService.ts
import { client } from "./client";

export interface InterventionArea {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  content: any[];
  featuredImage?: {
    url: string;
    alt: string;
  };
  isActive: boolean;
  order: number;
}

// Query GROQ para obtener todas las áreas activas
const INTERVENTION_AREAS_QUERY = `
  *[_type == "interventionArea" && isActive == true] | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    content,
    "featuredImage": {
      "url": featuredImage.asset->url,
      "alt": featuredImage.alt
    },
    isActive,
    order
  }
`;

// Query GROQ para obtener un área específica por slug
const INTERVENTION_AREA_BY_SLUG_QUERY = `
  *[_type == "interventionArea" && slug.current == $slug && isActive == true][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    content,
    "featuredImage": {
      "url": featuredImage.asset->url,
      "alt": featuredImage.alt
    },
    isActive,
    order
  }
`;

export async function getAllInterventionAreas(): Promise<InterventionArea[]> {
  try {
    const areas: InterventionArea[] = await client.fetch(
      INTERVENTION_AREAS_QUERY
    );
    return areas;
  } catch (error) {
    console.error("Error fetching intervention areas:", error);
    return [];
  }
}

export async function getInterventionAreaBySlug(
  slug: string
): Promise<InterventionArea | null> {
  try {
    const area: InterventionArea = await client.fetch(
      INTERVENTION_AREA_BY_SLUG_QUERY,
      { slug }
    );
    return area;
  } catch (error) {
    console.error("Error fetching intervention area by slug:", error);
    return null;
  }
}

// Generar slugs para generateStaticParams
export async function getAllInterventionAreaSlugs(): Promise<string[]> {
  try {
    const slugs: string[] = await client.fetch(
      `*[_type == "interventionArea" && isActive == true].slug.current`
    );
    return slugs;
  } catch (error) {
    console.error("Error fetching intervention area slugs:", error);
    return [];
  }
}
```

### 2. Servicio de Carrusel (Actualizado)

```typescript
// lib/sanity/carouselService.ts
import { client } from "./client";
import { CarouselImage } from "@/sections/carousel/_components/CarouselSlider";

interface SanityCarouselSlide {
  image: {
    asset: {
      url: string;
    };
  };
  alt: string;
  linkType: "internal" | "external" | "none";
  interventionArea?: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  };
  externalUrl?: string;
  isActive: boolean;
}

interface SanityCarouselData {
  title: string;
  slides: SanityCarouselSlide[];
  autoPlayInterval: number;
  isActive: boolean;
}

export interface CarouselData {
  title: string;
  images: CarouselImage[];
  autoPlayInterval: number;
}

// Query GROQ para obtener datos del carrusel
const CAROUSEL_QUERY = `
  *[_type == "carousel" && isActive == true][0] {
    title,
    autoPlayInterval,
    isActive,
    slides[isActive == true] {
      "image": image.asset->url,
      alt,
      linkType,
      interventionArea->{
        _id,
        title,
        "slug": slug.current
      },
      externalUrl,
      isActive
    }
  }
`;

export async function getCarouselData(): Promise<CarouselData | null> {
  try {
    const data: SanityCarouselData = await client.fetch(CAROUSEL_QUERY);

    if (!data || !data.isActive) {
      return null;
    }

    // Transformar datos de Sanity al formato del componente
    const transformedImages: CarouselImage[] = data.slides
      .filter((slide) => slide.isActive)
      .map((slide) => {
        let url: string | undefined;

        if (slide.linkType === "internal" && slide.interventionArea) {
          url = `/areas/${slide.interventionArea.slug}`;
        } else if (slide.linkType === "external" && slide.externalUrl) {
          url = slide.externalUrl;
        }

        return {
          src: slide.image,
          alt: slide.alt,
          url,
        };
      });

    return {
      title: data.title,
      images: transformedImages,
      autoPlayInterval: data.autoPlayInterval,
    };
  } catch (error) {
    console.error("Error fetching carousel data:", error);
    return null;
  }
}
```

## Componentes de Next.js

### 1. Componente Principal del Carrusel (Actualizado)

```typescript
// sections/carousel/index.tsx
"use client";

import { useEffect, useState } from "react";
import Heading from "@/components/Heading";
import CarouselSlider, {
  type CarouselImage,
} from "./_components/CarouselSlider";
import { getCarouselData, type CarouselData } from "@/lib/sanity/carouselService";

interface CarouselProps {
  // Props opcionales para fallbacks o override
  fallbackImages?: CarouselImage[];
  fallbackTitle?: string;
  autoPlayInterval?: number;
}

export default function Carousel({
  fallbackImages = [
    {
      src: "/images/photo_slide.png",
      alt: "Red de Apoyo Iluminemos",
      url: "#",
    },
    {
      src: "/images/hero_images.png",
      alt: "Espacio de Familias",
    },
    {
      src: "/images/photo_slide3.png",
      alt: "Apoyo y Comunidad",
      url: "#",
    },
  ],
  fallbackTitle = "Conoce y Participa",
  autoPlayInterval = 3000,
}: CarouselProps) {
  const [carouselData, setCarouselData] = useState<CarouselData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCarouselData() {
      try {
        const data = await getCarouselData();
        setCarouselData(data);
      } catch (error) {
        console.error("Error loading carousel:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCarouselData();
  }, []);

  // Mientras carga, mostrar el fallback o un skeleton
  if (loading) {
    return (
      <section className="container max-w-full py-12 md:py-16" id="carousel">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mx-auto max-w-[750px]"></div>
        </div>
      </section>
    );
  }

  // Si no hay datos de Sanity, usar fallbacks
  const title = carouselData?.title || fallbackTitle;
  const images = carouselData?.images || fallbackImages;
  const interval = carouselData?.autoPlayInterval || autoPlayInterval;

  return (
    <section className="container max-w-full py-12 md:py-16" id="carousel">
      <Heading className="mb-8 md:mb-12">{title}</Heading>
      <CarouselSlider images={images} autoPlayInterval={interval} />
    </section>
  );
}
```

### 2. Página Dinámica de Áreas de Intervención

```typescript
// app/areas/[...slug]/page.tsx
import { notFound } from "next/navigation";
import { getInterventionAreaBySlug, getAllInterventionAreaSlugs } from "@/lib/sanity/interventionAreaService";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

interface InterventionAreaPageProps {
  params: {
    slug: string[];
  };
}

export default async function InterventionAreaPage({ params }: InterventionAreaPageProps) {
  const slug = params.slug.join("/");
  const area = await getInterventionAreaBySlug(slug);

  if (!area) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Imagen destacada */}
        {area.featuredImage && (
          <div className="mb-8">
            <Image
              src={area.featuredImage.url}
              alt={area.featuredImage.alt || area.title}
              width={800}
              height={400}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Título */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{area.title}</h1>

        {/* Descripción */}
        {area.description && (
          <p className="text-xl text-gray-600 mb-8">{area.description}</p>
        )}

        {/* Contenido principal */}
        <div className="prose prose-lg max-w-none">
          <PortableText value={area.content} />
        </div>
      </div>
    </div>
  );
}

// Generar rutas estáticas para todas las áreas de intervención
export async function generateStaticParams() {
  const slugs = await getAllInterventionAreaSlugs();

  return slugs.map((slug) => ({
    slug: slug.split("/"),
  }));
}

// Metadata dinámica para SEO
export async function generateMetadata({ params }: InterventionAreaPageProps) {
  const slug = params.slug.join("/");
  const area = await getInterventionAreaBySlug(slug);

  if (!area) {
    return {
      title: "Área no encontrada",
    };
  }

  return {
    title: `${area.title} - Zihuame`,
    description: area.description || `Conoce más sobre ${area.title}`,
    openGraph: {
      title: area.title,
      description: area.description,
      images: area.featuredImage ? [area.featuredImage.url] : [],
    },
  };
}
```

### 3. Página de Listado de Áreas

```typescript
// app/areas/page.tsx
import { getAllInterventionAreas } from "@/lib/sanity/interventionAreaService";
import Link from "next/link";
import Image from "next/image";

export default async function AreasPage() {
  const areas = await getAllInterventionAreas();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Nuestras Áreas de Intervención
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area) => (
            <Link
              key={area._id}
              href={`/areas/${area.slug}`}
              className="group block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {area.featuredImage && (
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <Image
                    src={area.featuredImage.url}
                    alt={area.featuredImage.alt || area.title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                  {area.title}
                </h2>
                {area.description && (
                  <p className="text-gray-600 line-clamp-3">{area.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Áreas de Intervención - Zihuame",
  description: "Conoce todas nuestras áreas de intervención y servicios especializados.",
};
```

### 4. Página 404 Personalizada

```typescript
// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Página no encontrada</h1>
      <p className="text-lg mb-8">
        La página que buscas no existe o ha sido movida.
      </p>
      <div className="space-x-4">
        <Link
          href="/"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Ir al Inicio
        </Link>
        <Link
          href="/areas"
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Ver Áreas de Intervención
        </Link>
      </div>
    </div>
  );
}
```

## Configuración de Sanity Studio

### 1. Configuración del Cliente

```typescript
// lib/sanity/client.ts
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2023-05-03",
  useCdn: process.env.NODE_ENV === "production",
});

// Configuración para preview mode
export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2023-05-03",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
```

### 2. Variables de Entorno

```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=tu_api_token
```

## Flujo de Trabajo Completo

### 1. Crear Área de Intervención

```
Admin en Sanity Studio:
├── Crear nuevo documento "Área de Intervención"
├── Título: "Terapia Individual"
├── Slug: "terapia-individual" (generado automáticamente)
├── Descripción: "Servicio especializado en..."
├── Contenido: [bloques de texto/imágenes]
├── Imagen destacada: [opcional]
└── Marcar como activa
```

### 2. Agregar al Carrusel

```
Admin en Sanity Studio:
├── Editar documento "Carrusel"
├── Agregar nueva imagen
├── Tipo de enlace: "Área de Intervención"
├── Seleccionar: "Terapia Individual"
└── Guardar
```

### 3. Resultado Automático

```
Sistema genera automáticamente:
├── Página: /areas/terapia-individual
├── URL en carrusel: /areas/terapia-individual
├── SEO metadata optimizada
└── Navegación funcional
```

## Beneficios del Sistema

### Para el Admin

✅ **Simplicidad**: Crear área → automáticamente disponible en carrusel  
✅ **Consistencia**: Imposible crear enlaces rotos  
✅ **Flexibilidad**: No todas las áreas necesitan estar en carrusel  
✅ **Escalabilidad**: Agregar nuevas áreas sin tocar código

### Para el Usuario

✅ **Navegación fluida**: Todos los enlaces funcionan  
✅ **Contenido rico**: Páginas dedicadas para cada área  
✅ **SEO optimizado**: URLs limpias y metadata personalizada  
✅ **Experiencia coherente**: Diseño consistente en todas las páginas

### Para el Desarrollador

✅ **Mantenimiento mínimo**: Sistema auto-gestionado  
✅ **Código limpio**: Separación clara de responsabilidades  
✅ **Performance**: Caché inteligente y optimizaciones  
✅ **Escalabilidad**: Fácil agregar nuevas funcionalidades

## Consideraciones Técnicas

### Performance

- **Caché**: Datos se cachean con revalidación cada 5 minutos
- **Imágenes**: Optimización automática con Next.js Image
- **Rutas estáticas**: Generación en build time para mejor performance

### SEO

- **URLs limpias**: `/areas/terapia-individual`
- **Metadata dinámica**: Títulos y descripciones personalizadas
- **Sitemap**: Generación automática de rutas

### Accesibilidad

- **Alt text obligatorio**: Para todas las imágenes
- **Navegación por teclado**: Enlaces accesibles
- **Contraste**: Cumple estándares WCAG

Este sistema garantiza una experiencia de usuario fluida, mantenimiento mínimo y escalabilidad máxima para el carrusel y las áreas de intervención.
