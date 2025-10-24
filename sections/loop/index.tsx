"use client";

import Button from "@/components/Button";
import SimpleMarquee from "@/components/fancy/blocks/simple-marquee";
import { cn } from "@/lib/utils/cn";

interface LoopProps {
  separator?: string;
  separatorColor?: string;
  className?: string;
}

const cultures = [
  { name: "Otomí", color: "#8DC63E" },
  { name: "Nahua", color: "#6AB7E6" },
  { name: "Mixteca", color: "#DD65A5" },
  { name: "Tsotsil", color: "#EFDE2E" },
  { name: "Tének", color: "#9B89C0" },
  { name: "Totonaca", color: "#00B3D8" },
  { name: "Mazahua", color: "#F1C7D5" },
  { name: "Huasteca", color: "#E26D2F" },
];

export default function Loop({
  separator = "✦",
  separatorColor = "#FDE000",
  className,
}: LoopProps) {
  return (
    <section
      className="py-6 flex flex-col items-center gap-8 md:gap-12"
      id="loop"
    >
      <SimpleMarquee
        direction="right"
        baseVelocity={10}
        repeat={4}
        draggable={true}
        dragSensitivity={0.1}
        grabCursor={true}
        dragAwareDirection={true}
        slowdownOnHover={true}
        useScrollVelocity={true}
        scrollAwareDirection={true}
        className={cn(
          "text-3xl md:text-4xl xl:text-[4rem] font-komet font-extrabold",
          className
        )}
      >
        <div className="flex items-center gap-4 whitespace-nowrap">
          {cultures.map((culture, index) => (
            <>
              <span
                key={index}
                className={cn(
                  `inline-flex items-center`,
                  index === 0 && "ml-4"
                )}
                style={{ color: culture.color }}
              >
                {culture.name}
              </span>
              <span
                className="text-3xl md:text-4xl xl:text-[4rem] font-bold"
                style={{ color: separatorColor }}
              >
                {separator}
              </span>
            </>
          ))}
        </div>
      </SimpleMarquee>
      <Button
        href="/#informes"
        className="btn-outline [&>span]:bg-base-content hover:bg-accent"
      >
        Conoce más
      </Button>
    </section>
  );
}
