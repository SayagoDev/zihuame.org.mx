# Áreas de Intervención

Este componente muestra las áreas de intervención de la organización con interacciones interactivas.

## Estructura

```
areas-of-intervention/
├── _components/           # Componentes internos
│   ├── AreaCard.tsx      # Tarjeta individual de área
│   ├── AreaInfoPopover.tsx # Popover con información del área
│   └── AreasGrid.tsx     # Grid de áreas
├── constants.ts          # Datos de las áreas
├── types.ts             # Tipos TypeScript
├── index.tsx            # Componente principal
└── README.md            # Esta documentación
```

## Componentes

### `AreasOfIntervention` (Principal)

Componente contenedor que maneja el estado global de qué área está activa.

**Responsabilidades:**

- Manejo del estado de área activa
- División de áreas en filas (3 + 2)
- Renderizado del layout principal

### `AreasGrid`

Renderiza un conjunto de áreas en formato grid.

**Props:**

- `areas`: Array de áreas a mostrar
- `activeArea`: ID del área actualmente activa
- `onAreaActivate`: Callback cuando se activa un área
- `onAreaDeactivate`: Callback cuando se desactiva un área

### `AreaCard`

Representa una tarjeta individual de área con su logo e información.

**Props:**

- `area`: Datos del área
- `isActive`: Si el área está actualmente activa
- `onActivate`: Callback cuando se activa
- `onDeactivate`: Callback cuando se desactiva

**Características:**

- Efecto hover con escala
- Click y hover para mostrar información
- Accesibilidad mejorada con ARIA

### `AreaInfoPopover`

Muestra la información detallada de un área en un popover.

**Props:**

- `title`: Título del área
- `description`: Descripción del área
- `href`: Enlace para "Saber Más"

## Mejoras Implementadas

### 1. **Separación de Responsabilidades**

- Componente principal solo maneja estado y layout
- Lógica de UI delegada a componentes especializados
- Datos separados en archivo de constantes

### 2. **Tipos TypeScript**

- Interface `AreaOfIntervention` para type safety
- Props tipadas en todos los componentes
- Mejor autocompletado y detección de errores

### 3. **Eliminación de Código Duplicado**

- Componente `AreaCard` reutilizable
- Componente `AreaInfoPopover` reutilizable
- Grid genérico que funciona para cualquier cantidad de áreas

### 4. **Mejoras de Accesibilidad**

- Uso de elementos semánticos (`<button>` en lugar de `<div>`)
- Atributos ARIA apropiados (`aria-expanded`, `aria-label`, `aria-labelledby`)
- Títulos ocultos para lectores de pantalla (`sr-only`)

### 5. **Optimización de Rendimiento**

- `useCallback` para evitar re-renders innecesarios
- Prop `priority` en imágenes principales
- Manejo eficiente del estado

### 6. **Mantenibilidad**

- Estructura de carpetas clara
- Componentes pequeños y enfocados
- Fácil agregar/modificar áreas (solo editar `constants.ts`)

## Cómo Agregar una Nueva Área

1. Edita `constants.ts`
2. Agrega un nuevo objeto al array `AREAS_DATA`:

```typescript
{
  id: "nueva-area",
  src: "/images/aof-logos/nueva_area.svg",
  alt: "Nueva Área Logo",
  title: "Nueva Área",
  href: "#",
  description: "Descripción de la nueva área...",
  className: "w-[12rem] md:w-[14rem] lg:w-[16rem] xl:w-[18.75rem] object-contain",
}
```

3. El componente se actualizará automáticamente

## Estilos

Los estilos utilizan:

- **Tailwind CSS** para utilidades
- **Variables CSS** (`--color-base-200`) para temas
- **Clases personalizadas** (`t-save`, `t-save-active`) definidas en globals.css
