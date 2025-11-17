import { useState } from "react";
import { useFormikContext } from "formik";
import UpdateRouteStopItem from "./stop-item";
import RouteTabSelectedStopContent from "./selected-stop-content";
import type { ICirculationCourse } from "@/types/entity/circulation";

const UpdateOperationalRouteTab: React.FC = () => {
  const { values } = useFormikContext<ICirculationCourse>();
  const [selectedStopIndex, setSelectedStopIndex] = useState<number>(0);

  const selectedStop = values?.parcours?.pointDeParcours?.[selectedStopIndex];

  return (
    <div className="h-full -mt-4">
      <div className="flex gap-6">
        <div className="w-1/3 max-w-[400px] h-[calc(100vh-225px)] overflow-y-auto divide-y pt-6">
          {(values?.parcours?.pointDeParcours ?? [])?.map(
            (point, index, arr) => {
              return (
                <div
                  key={point?.rang}
                  className="border-gray-200"
                  onClick={() => setSelectedStopIndex(index)}
                >
                  <UpdateRouteStopItem
                    stop={point}
                    index={index}
                    allStops={arr}
                    selectedStop={selectedStop}
                  />
                </div>
              );
            }
          )}
        </div>
        <div className="flex-1 border-l border-gray-200">
          {selectedStop ? (
            <RouteTabSelectedStopContent
              stop={selectedStop}
              index={selectedStopIndex}
            />
          ) : (
            <div className="flex items-center justify-center py-10">
              <p className="text-gray-500">
                Veuillez choisir un point de parcours
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateOperationalRouteTab;
