import { cn } from "@/lib/utils/cn";

export default function Button({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "btn md:btn-md lg:btn-lg rounded-full flex items-center justify-center gap-4",
        className
      )}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-base-100 align-middle"></span>
      {children}
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-base-100 align-middle"></span>
    </a>
  );
}
