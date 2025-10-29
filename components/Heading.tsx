import { cn } from "@/lib/utils/cn";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function Heading({
  children,
  className,
  headingLevel = "h2",
  ...props
}: HeadingProps) {
  const HeadingTag = headingLevel;
  return (
    <HeadingTag
      className={cn(
        "text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-komet font-extrabold text-center flex items-center gap-2 sm:gap-4 md:gap-6",
        "before:content-[''] before:flex-1 before:h-px before:bg-black before:min-w-8",
        "after:content-[''] after:flex-1 after:h-px after:bg-black after:min-w-8",
        className,
      )}
      {...props}
    >
      {children}
    </HeadingTag>
  );
}
