import { dayjs } from "@/lib/dayjs";
import type { PointDeParcour } from "@/types/entity/circulation";

interface TrainParcoursProps {
  parcours: PointDeParcour[];
}

const TrainParcours: React.FC<TrainParcoursProps> = ({ parcours }) => {
  const departure = parcours[0];
  const arrival = parcours[parcours.length - 1];
  return (
    <div className="flec flex-col w-96">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500 font-medium">
          {dayjs(departure?.arret?.depart?.horaire).format("HH:mm")}
        </p>
        <p className="text-xs text-gray-500 font-medium">
          {dayjs(arrival?.arret?.arrivee?.horaire).format("HH:mm")}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <h3 className="font-medium text-base whitespace-nowrap">
          {departure?.desserte?.libelle12}
        </h3>

        <div className="flex items-center flex-1 translate-y-0.5 justify-center">
          <span className="w-[5rem] h-0.5 rounded-r rounded-l border-dashed border-1 border-gray-500" />
          <span className="text-xs px-1 z-20 text-gray-500 whitespace-nowrap">
            {parcours.length === 2
              ? "Direct"
              : `${parcours.length - 2} passages`}
          </span>
          <span className="w-[5rem] h-0.5 rounded-r rounded-l border-dashed border-1 border-gray-500" />
        </div>

        <h3 className="font-medium text-base whitespace-nowrap">
          {arrival?.desserte?.libelle12}
        </h3>
      </div>
    </div>
  );
};

export default TrainParcours;
