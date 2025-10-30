import { DonationButtonWrapper } from "@/components/DonationButtonWrapper";

interface AreaInfoPopoverProps {
  title: string;
  description: string;
  href: string;
  programId: string;
}

export default function AreaInfoPopover({
  title,
  description,
  href,
  programId,
}: AreaInfoPopoverProps) {
  return (
    <div className="mt-6 w-80 sm:w-70 xl:w-90 max-w-sm absolute bottom-0 translate-y-[calc(100%+1.5rem)] left-1/2 transform -translate-x-1/2 z-20">
      <div className="relative bg-base-200 rounded-lg p-4 xl:p-6 shadow-sm">
        {/* Triángulo apuntando hacia arriba */}
        <div
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0 h-0
                     border-l-[16px] border-l-transparent
                     border-r-[16px] border-r-transparent
                     border-b-[16px] border-b-[var(--color-base-200)]"
          aria-hidden="true"
        />

        <h3 className="sr-only">{title}</h3>
        <p className="text-lg md:text-xl xl:text-2xl">
          {description}
          <a
            href={href}
            className="text-orange-500 font-medium cursor-pointer hover:text-orange-600 transition-colors ml-1"
            aria-label={`Saber más sobre ${title}`}
          >
            <span className="gap-2">
              Saber Más{" "}
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block translate-y-[-1px] w-3 h-3"
              >
                <path
                  d="M1.25 1.25H11.25M11.25 1.25V11.25M11.25 1.25L1.25 11.25"
                  stroke="#FC6900"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </p>

        <div className="mt-2">
          <DonationButtonWrapper
            className="btn-sm btn-warning text-base-100"
            initialProgram={programId}
          >
            Donar Ahora
          </DonationButtonWrapper>
        </div>
      </div>
    </div>
  );
}
