import CountUp from "@/components/CountUp";
import { cn } from "@/lib/utils/cn";

export function DataCount({
  label,
  to,
  from = 0,
  duration = 1,
  separator = ",",
  className = "",
  labelClassName = "",
  showGradient = false,
  gradientColor = "warning",
}: {
  label: string;
  to: number;
  from?: number;
  duration?: number;
  separator?: string;
  className?: string;
  labelClassName?: string;
  showGradient?: boolean;
  gradientColor?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5 lg:gap-2">
      <div className="relative">
        {showGradient && (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[43%] size-28 md:size-32 xl:size-44 rounded-full blur-2xl xl:blur-3xl -z-10"
            style={{
              background: `radial-gradient(circle at center, ${
                gradientColor.includes("#")
                  ? gradientColor
                  : `var(--color-${gradientColor})`
              } 0%, ${
                gradientColor.includes("#")
                  ? gradientColor + "00"
                  : `color-mix(in hsl, var(--color-${gradientColor}) 0%, transparent 100%)`
              } 100%)`,
            }}
          />
        )}
        <CountUp
          from={from}
          to={to}
          duration={duration}
          separator={separator}
          className={cn(
            "font-komet font-extrabold text-4xl text-shadow-2xs text-shadow-base-content/50",
            className,
          )}
        />
      </div>
      <p className={cn("font-medium text-xl", labelClassName)}>{label}</p>
    </div>
  );
}
