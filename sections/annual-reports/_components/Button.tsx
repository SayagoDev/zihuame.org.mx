import { cn } from "@/lib/utils/cn";

interface ButtonProps {
  children: React.ReactNode;
  href: string;
  target?: string;
  className?: string;
}

export default function Button({
  children,
  href,
  target,
  className,
}: ButtonProps) {
  return (
    <a
      href={href}
      target={target}
      className={cn(
        "btn btn-outline text-xl xl:text-2xl 3xl:text-3xl hover:bg-success uppercase font-bold gap-2 py-5 xl:py-6 3xl:py-7 w-full",
        className,
      )}
    >
      {children}
      <svg
        width="25"
        height="25"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.875 1.5H4.625C3.7962 1.5 3.00134 1.82924 2.41529 2.41529C1.82924 3.00134 1.5 3.7962 1.5 4.625V23.375C1.5 24.2038 1.82924 24.9987 2.41529 25.5847C3.00134 26.1708 3.7962 26.5 4.625 26.5H23.375C24.2038 26.5 24.9987 26.1708 25.5847 25.5847C26.1708 24.9987 26.5 24.2038 26.5 23.375V17.125M14 14L26.5 1.5M26.5 1.5V9.3125M26.5 1.5H18.6875"
          stroke="#040504"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
