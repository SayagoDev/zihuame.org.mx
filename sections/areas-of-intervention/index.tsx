"use client";

import { useCallback, useState } from "react";
import Heading from "@/components/Heading";
import { AREAS_DATA } from "./constants";
import AreasGrid from "./_components/AreasGrid";

export default function AreasOfIntervention() {
  const [activeArea, setActiveArea] = useState<string | null>(null);

  // Para onClick: toggle (activar/desactivar)
  const handleAreaToggle = useCallback((areaId: string) => {
    setActiveArea((prevArea) => (prevArea === areaId ? null : areaId));
  }, []);

  // Para onPointerEnter: solo activar en mouse (no en touch)
  const handleAreaHover = useCallback((areaId: string, pointerType: string) => {
    // Solo activar con hover si es un mouse, no en touch devices
    if (pointerType === "mouse") {
      setActiveArea(areaId);
    }
  }, []);

  // Para onPointerLeave: solo desactivar en mouse (no en touch)
  const handleAreaDeactivate = useCallback((pointerType: string) => {
    // Solo desactivar cuando sales con el mouse, no en touch
    if (pointerType === "mouse") {
      setActiveArea(null);
    }
  }, []);

  // Para cerrar al hacer click en el fondo
  const handleBackgroundClick = useCallback(() => {
    setActiveArea(null);
  }, []);

  // Dividir las áreas en dos filas (3 + 2)
  const firstRow = AREAS_DATA.slice(0, 3);
  const secondRow = AREAS_DATA.slice(3);

  return (
    <section
      id="areas-of-intervention"
      className="container max-w-full py-12 md:py-16"
      aria-labelledby="areas-heading"
      onClick={handleBackgroundClick}
    >
      <Heading id="areas-heading">Áreas de Intervención</Heading>

      <div className="max-w-[75rem] mt-12 flex flex-col sm:flex-row md:flex-col sm:justify-center sm:items-start gap-8 3xl:gap-10 mx-auto">
        {/* Primera fila: 3 áreas */}
        <div className="md:mx-auto">
          <AreasGrid
            areas={firstRow}
            activeArea={activeArea}
            onAreaToggle={handleAreaToggle}
            onAreaHover={handleAreaHover}
            onAreaDeactivate={handleAreaDeactivate}
          />
        </div>

        {/* Segunda fila: 2 áreas */}
        <div className="md:mx-auto">
          <AreasGrid
            areas={secondRow}
            activeArea={activeArea}
            onAreaToggle={handleAreaToggle}
            onAreaHover={handleAreaHover}
            onAreaDeactivate={handleAreaDeactivate}
          />
        </div>
      </div>
    </section>
  );
}
