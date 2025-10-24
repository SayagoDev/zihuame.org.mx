import { cn } from "@/lib/utils/cn";

export default function ButtonLine({
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
        "btn btn-link p-0 m-0 text-error text-sm md:text-xl absolute right-4 lg:relative lg:right-0 after:content-[''] after:absolute after:bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-error after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-in-out",
        className
      )}
    >
      {children}
    </a>
  );
}
