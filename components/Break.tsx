import { cn } from "@/lib/utils/cn";

interface BreakProps {
  className?: string;
  style?: React.CSSProperties;
  "aria-hidden"?: boolean;
}

export default function Break({ className, style, ...props }: BreakProps) {
  return (
    <div className="container max-w-full relative" {...props}>
      <svg
        className={cn("w-full", className)}
        style={{ ...style, height: "1px" }}
        viewBox="0 0 100 1"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="0.5"
          x2="100"
          y2="0.5"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
