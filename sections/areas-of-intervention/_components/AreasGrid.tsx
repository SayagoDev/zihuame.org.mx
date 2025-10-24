import { AreaOfIntervention } from "../types";
import AreaCard from "./AreaCard";

interface AreasGridProps {
  areas: AreaOfIntervention[];
  activeArea: string | null;
  onAreaToggle: (areaId: string) => void;
  onAreaHover: (areaId: string, pointerType: string) => void;
  onAreaDeactivate: (pointerType: string) => void;
}

export default function AreasGrid({
  areas,
  activeArea,
  onAreaToggle,
  onAreaHover,
  onAreaDeactivate,
}: AreasGridProps) {
  return (
    <div className="flex flex-col md:flex-row items-center md:justify-between gap-8 3xl:gap-10">
      {areas.map((area) => (
        <AreaCard
          key={area.id}
          area={area}
          isActive={activeArea === area.id}
          onToggle={() => onAreaToggle(area.id)}
          onHover={(pointerType) => onAreaHover(area.id, pointerType)}
          onDeactivate={(pointerType) => onAreaDeactivate(pointerType)}
        />
      ))}
    </div>
  );
}
