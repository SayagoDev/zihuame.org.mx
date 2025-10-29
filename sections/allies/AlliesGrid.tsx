"use client";

import Heading from "@/components/Heading";
import { AllieDTO } from "@/data/allies";
import Image from "next/image";
import { use, useState } from "react";

export default function AlliesSection({
  allies,
}: {
  allies: Promise<AllieDTO[]>;
}) {
  const alliesData = use(allies);

  const availableYears = [
    ...new Set(
      alliesData.map((ally) => {
        return ally.year;
      }),
    ),
  ].sort((a, b) => b - a);

  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear() - 1,
  );

  const filteredAllies = alliesData.filter(
    (ally) => ally.year === selectedYear,
  );

  const isEmpty = filteredAllies.length === 0;
  const isOne = filteredAllies.length === 1;

  return (
    <section className="container max-w-full py-16  md:py-24">
      <Heading headingLevel="h1">Alianzas que Transforman Vidas</Heading>
      <div className="max-w-[1200px] mx-auto relative">
        <div className="text-center mb-12 mt-6">
          <p className="text-base md:text-xl mx-auto mb-16 text-pretty leading-relaxed">
            Nuestro trabajo no sería posible sin la confianza y el generoso
            apoyo de nuestros aliados. Cada colaboración, grande o pequeña,
            representa un compromiso compartido con la dignidad, la igualdad y
            el desarrollo de las comunidades indígenas. Agradecemos
            profundamente a cada organización que se ha sumado a nuestra misión.
            Juntos, fortalecemos raíces y construimos un futuro con esperanza.
          </p>

          {/* Year Selector */}
          <div className="absolute right-0 -translate-y-[120%]">
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) =>
                  setSelectedYear(Number.parseInt(e.target.value))
                }
                className="appearance-none w-fit text-2xl px-[20px] pt-[5px] pr-8 border-1 cursor-pointer focus:outline-none focus:ring-1 transition-colors"
              >
                {availableYears.map((year) => (
                  <option key={year} value={year} className="bg-base-100">
                    {year}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-foreground/60"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-foreground/20 bg-background [&:nth-child(2n)]:sm:border-r-0 [&:nth-last-child(1)]:border-b-0 border-foreground/20 ${isEmpty || isOne ? "border-t-0" : ""}`}
        >
          {filteredAllies.map((ally) => (
            <div
              key={ally.id}
              className={`border-b sm:border-r border-foreground/20 p-8 flex items-center justify-center bg-background min-h-[250px] transition-colors duration-300 hover:bg-base-300/30 group ${isOne ? "border-t-1" : ""}`}
            >
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={ally.img || "/placeholder.svg"}
                  alt={ally.name}
                  width={250}
                  height={150}
                  className="max-w-[250px] max-h-[150px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          ))}

          {/* CTA Cell - Always last */}
          <div
            className={`border-b sm:border-r border-foreground/20 p-8 flex flex-col items-center justify-center bg-background min-h-[250px] gap-4 transition-colors duration-300 hover:bg-base-300/30 ${isEmpty || isOne ? "sm:border-t-1" : ""} ${isEmpty ? "border-t-1" : ""}`}
          >
            <p className="text-center text-2xl">
              ¿Quieres ser parte del cambio?
            </p>
            <button className="bg-warning/80 hover:bg-warning text-base-100 font-bold px-8 py-3 rounded-full text-lg md:text-xl xl:text-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
              Conviértete en Aliado
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
