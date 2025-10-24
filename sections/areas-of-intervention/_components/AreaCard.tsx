import Image from "next/image";
import { AreaOfIntervention } from "../types";
import AreaInfoPopover from "./AreaInfoPopover";

interface AreaCardProps {
  area: AreaOfIntervention;
  isActive: boolean;
  onToggle: () => void;
  onHover: (pointerType: string) => void;
  onDeactivate: (pointerType: string) => void;
}

export default function AreaCard({
  area,
  isActive,
  onToggle,
  onHover,
  onDeactivate,
}: AreaCardProps) {
  return (
    <div
      className="relative"
      onPointerLeave={(e) => onDeactivate(e.pointerType)}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className={`relative cursor-pointer transition-transform hover:scale-105 t-save ${
          isActive ? "t-save-active" : ""
        }`}
        onClick={onToggle}
        onPointerEnter={(e) => onHover(e.pointerType)}
        aria-expanded={isActive}
        aria-label={`Ver información sobre ${area.title}`}
      >
        <Image
          src={area.src}
          alt={area.alt}
          width={300}
          height={270}
          className={area.className}
          priority
        />
      </button>

      {isActive && (
        <AreaInfoPopover
          title={area.title}
          description={area.description}
          href={area.href}
        />
      )}
    </div>
  );
}
