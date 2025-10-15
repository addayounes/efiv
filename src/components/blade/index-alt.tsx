import Lane from "./lane";
import Events from "./events";
import NameNumber from "./name-number";
import TimeStatus from "./time-status";
import Destination from "./destination";
import type { CreateCirculationDto } from "@/types/dto/create-circulation";

interface CirculationBladeAltProps {
  circulation: CreateCirculationDto;
}

const CirculationBladeAlt: React.FC<CirculationBladeAltProps> = ({
  circulation,
}) => {
  return (
    <div className="p-4 hover:brightness-105 bg-blade-departure-900 rounded-lg">
      <div className="flex items-center justify-between gap-8 border-b border-blade-departure-800 pb-4">
        <div className="flex flex-col">
          <div>
            <TimeStatus circulation={circulation} />
          </div>
          <div className="overflow-x-hidden">
            <NameNumber circulation={circulation} />
          </div>
        </div>

        <div className="w-fit">
          <Lane circulation={circulation} />
        </div>
      </div>
      <div className="pt-2">
        <Destination circulation={circulation} />
      </div>

      {/* Info Conj */}
      <Events circulation={circulation} />
    </div>
  );
};

export default CirculationBladeAlt;
