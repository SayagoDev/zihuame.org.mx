"use client";
import { DataCount } from "./_components/DataCount";
import Break from "@/components/Break";
import { use, useEffect, useRef } from "react";
import { useConfettiOnIntersection } from "@/lib/confetti";
import { StatsDTO } from "@/data/stats";

export default function Stats({ data }: { data: Promise<StatsDTO> }) {
  const { year, peopleAttended, womenAttended, menAttended } = use(data);

  const sectionRef = useRef<HTMLElement | null>(null);
  const observerCleanupRef = useRef<(() => void) | null>(null);

  const confettiConfig = useRef({
    count: 200,
    origin: { y: 0.95 },
  });

  const { setupObserver } = useConfettiOnIntersection(
    0.5,
    confettiConfig.current,
  );

  useEffect(() => {
    if (!sectionRef.current || observerCleanupRef.current) return;

    observerCleanupRef.current = setupObserver(sectionRef.current);

    return () => {
      if (observerCleanupRef.current) {
        observerCleanupRef.current();
        observerCleanupRef.current = null;
      }
    };
  }, []); // Empty dependency array to run only once

  return (
    <>
      <section
        ref={sectionRef}
        className="container max-w-full py-[3.75rem] pb-0 lg:py-[3.75rem]"
        id="stats"
      >
        <div className="grid grid-cols-3 lg:grid-cols-[1fr_3fr_1fr] grid-rows-2 lg:grid-rows-1 lg:place-items-center gap-4">
          <div className="col-start-1 lg:col-start-2 col-span-3 lg:col-span-1 flex flex-col items-center">
            <h2 className="font-komet font-bold text-2xl lg:text-3xl xl:text-[2.5rem] text-center">
              Durante el {year} atendimos a un total de
            </h2>
            <DataCount
              label="Personas"
              to={peopleAttended}
              className="text-primary text-6xl lg:text-7xl xl:text-8xl"
              labelClassName="font-komet font-bold text-2xl lg:text-3xl xl:text-[2.5rem]"
            />
          </div>
          <div className="col-start-1 row-start-2 lg:row-start-1">
            <DataCount
              label="Mujeres"
              to={womenAttended}
              className="text-warning md:text-5xl lg:text-6xl"
              labelClassName="md:text-2xl lg:text-3xl"
              showGradient={true}
              gradientColor="warning"
            />
          </div>
          <div className="col-start-3 row-start-2 lg:row-start-1">
            <DataCount
              label="Hombres"
              to={menAttended}
              className="text-accent md:text-5xl lg:text-6xl"
              labelClassName="md:text-2xl lg:text-3xl"
              showGradient={true}
              gradientColor="accent"
            />
          </div>
        </div>
      </section>
      <Break aria-hidden={true} />
    </>
  );
}
