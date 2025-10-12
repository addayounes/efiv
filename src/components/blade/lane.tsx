import type { CreateCirculationDto } from "../../types/dto/create-circulation";

interface LaneProps {
  circulation: CreateCirculationDto;
}

const Lane: React.FC<LaneProps> = ({ circulation }) => {
  if (!circulation?.parcours?.[0]?.voieTransporteur) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="text-center w-[66px] h-[70px] bg-white text-blade-departure-900 border-3 border-white rounded-md">
        <p className="text-[18px]">Voie</p>
        <p className="text-[44px] font-bold -mt-5">
          {circulation?.parcours?.[0]?.voieTransporteur}
        </p>
      </div>
    </div>
  );
};

export default Lane;
