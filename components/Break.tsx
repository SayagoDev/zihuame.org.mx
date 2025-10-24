import { cn } from "@/lib/utils/cn";

interface BreakProps {
  className?: string;
  style?: React.CSSProperties;
  "aria-hidden"?: boolean;
}

export default function Break({ className, style, ...props }: BreakProps) {
  return (
    <div className="container max-w-full relative" {...props}>
      <div
        className={cn("h-[1px] bg-base-content", className)}
        style={style}
      ></div>
    </div>
  );
}
