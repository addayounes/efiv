import { dayjs } from "@/lib/dayjs";
import type { PointDeParcour } from "@/types/entity/circulation";

interface TrainParcoursProps {
  parcours: PointDeParcour[];
}

const TrainParcours: React.FC<TrainParcoursProps> = ({ parcours }) => {
  const departure = parcours[0];
  const arrival = parcours[parcours.length - 1];
  return (
    <div className="flec flex-col w-fit">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 font-medium">
          {dayjs(departure?.arret?.depart?.horaire).format("HH:mm")}
        </p>
        <p className="text-sm text-gray-500 font-medium">
          {dayjs(arrival?.arret?.arrivee?.horaire).format("HH:mm")}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <h3 className="font-medium text-base">
          {departure?.desserte?.libelle12}
        </h3>
        <div className="flex items-center flex-col flex-1 -translate-y-2">
          <span className="text-xs mb-1">
            {parcours.length === 2 ? "Direct" : `${parcours.length} dessertes`}
          </span>
          <span className="w-[10rem] h-0.5 rounded-r rounded-l border-dashed border-1" />
        </div>
        <h3 className="font-medium text-base">
          {arrival?.desserte?.libelle12}
        </h3>
      </div>
    </div>
  );
};

export default TrainParcours;
