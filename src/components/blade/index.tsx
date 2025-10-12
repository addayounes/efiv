import Lane from "./lane";
import Events from "./events";
import NameNumber from "./name-number";
import TimeStatus from "./time-status";
import Destination from "./destination";
import type { CreateCirculationDto } from "../../types/dto/create-circulation";

interface CirculationBladeProps {
  circulation: CreateCirculationDto;
}

const CirculationBlade: React.FC<CirculationBladeProps> = ({ circulation }) => {
  return (
    <div className="p-4 hover:brightness-105 bg-blade-departure-900 rounded-lg">
      <div className="flex items-center gap-8">
        <div className="basis-[14%] grow-0 shrink-0">
          <TimeStatus circulation={circulation} />
        </div>
        <div className="basis-[8%] overflow-x-hidden grow-0 shrink-0">
          <NameNumber circulation={circulation} />
        </div>
        <div className="flex-1">
          <Destination circulation={circulation} />
        </div>
        <div className="w-fit grow-0 shrink-0">
          <Lane circulation={circulation} />
        </div>
      </div>

      {/* Info Conj */}
      <Events circulation={circulation} />
    </div>
  );
};

export default CirculationBlade;
