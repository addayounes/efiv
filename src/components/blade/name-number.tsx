import ScrollText from "./scroll-text";
import type { CreateCirculationDto } from "@/types/dto/create-circulation";

interface NameNumberProps {
  circulation: CreateCirculationDto;
}

const NameNumber: React.FC<NameNumberProps> = ({ circulation }) => {
  return (
    <div className="flex flex-col items-center">
      {circulation?.marqueCommerciale && (
        <ScrollText
          text={circulation?.marqueCommerciale?.toUpperCase()}
          className="text-[19px] font-medium text-blade-departure-50"
        />
      )}
      {circulation?.numeroCommercial && (
        <ScrollText
          text={circulation?.numeroCommercial}
          className="text-[20px] text-blade-departure-100"
        />
      )}
    </div>
  );
};

export default NameNumber;
