import type { CreateCirculationDto } from "@/types/dto/create-circulation";

interface NameNumberProps {
  circulation: CreateCirculationDto;
}

const NameNumber: React.FC<NameNumberProps> = ({ circulation }) => {
  return (
    <div className="flex gap-4 items-center">
      {circulation?.marqueCommerciale && (
        <div className="text-[19px] font-medium text-blade-departure-50">
          {circulation?.marqueCommerciale?.toUpperCase()}
        </div>
      )}
      {circulation?.numeroCommercial && (
        <div className="text-[20px] text-blade-departure-100">
          {circulation?.numeroCommercial}
        </div>
      )}
    </div>
  );
};

export default NameNumber;
