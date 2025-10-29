import React from "react";
import Button from "@/components/Button";
import SimpleMarquee from "@/components/fancy/blocks/simple-marquee";
import { StatsService } from "@/data/stats";
import { cn } from "@/lib/utils/cn";

export default async function Loop({ className }: { className?: string }) {
  const { communities, separator, separatorColor } =
    await new StatsService().getStatsData();

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
          className,
        )}
      >
        <div className="flex items-center gap-4 whitespace-nowrap">
          {communities.map((culture, index) => (
            <React.Fragment key={culture.id}>
              <span
                className={cn(
                  `inline-flex items-center`,
                  index === 0 && "ml-4",
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
            </React.Fragment>
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
