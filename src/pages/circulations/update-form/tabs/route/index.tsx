import type {
  PointDeParcour,
  ICirculationCourse,
} from "@/types/entity/circulation";
import { cn } from "@/utils/cn";
import { useState } from "react";
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
        {(circulation?.parcours?.pointDeParcours ?? [])?.map((point, index) => {
          const isOrigin = index === 0;
          const isDestination =
            index === (circulation?.parcours?.pointDeParcours?.length ?? 0) - 1;
          return (
            <div
              key={point?.rang}
              onClick={() => setSelectedStop(point)}
              className={cn(
                "pr-4 pl-3 py-2 border-gray-200 rounded cursor-pointer border-l-6 border-l-transparent",
                selectedStop?.rang === point?.rang
                  ? "bg-primary-light border-l-primary"
                  : "hover:bg-gray-100",
                !isOrigin && !isDestination ? "pl-10" : ""
              )}
            >
              <p className="text-xs w-fit mb-1 text-primary">
                {isOrigin
                  ? "Origine"
                  : isDestination
                  ? "Destination"
                  : `Passage ${index}`}
              </p>
              <h4 className="font-medium">{point?.desserte?.libelle23}</h4>
            </div>
          );
        })}
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
