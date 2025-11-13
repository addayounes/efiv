import type {
  PointDeParcour,
  ICirculationCourse,
} from "@/types/entity/circulation";
import { useState } from "react";
import UpdateRouteStopItem from "./stop-item";
import RouteTabSelectedStopContent from "./selected-stop-content";

interface UpdateOperationalRouteTabProps {
  circulation: ICirculationCourse;
}

const UpdateOperationalRouteTab: React.FC<UpdateOperationalRouteTabProps> = ({
  circulation,
}) => {
  const [selectedStop, setSelectedStop] = useState<PointDeParcour>(
    circulation?.parcours?.pointDeParcours?.[0] || null
  );
  return (
    <div className="flex gap-6 h-96">
      <div className="w-1/3 max-w-[400px] divide-y">
        {(circulation?.parcours?.pointDeParcours ?? [])?.map(
          (point, index, arr) => {
            return (
              <UpdateRouteStopItem
                stop={point}
                index={index}
                allStops={arr}
                key={point?.rang}
                selectedStop={selectedStop}
                onSelected={setSelectedStop}
              />
            );
          }
        )}
      </div>
      <div className="flex-1 border border-gray-200 rounded shadow-md">
        {selectedStop ? (
          <RouteTabSelectedStopContent stop={selectedStop} />
        ) : (
          <div className="flex items-center justify-center py-10">
            <p className="text-gray-500">
              Veuillez choisir un point de parcours
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateOperationalRouteTab;
