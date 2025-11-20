import { useState } from "react";
import { useFormikContext } from "formik";
import AddStopModal from "./add-stop-modal";
import UpdateRouteStopItem from "./stop-item";
import { type ICirculation } from "@/types/entity/circulation";
import AddLineSeparator from "@/components/add-line-seperator";
import RouteTabSelectedStopContent from "./selected-stop-content";
import { CirculationStatus } from "@/constants/circulation-status";

const UpdateOperationalRouteTab: React.FC = () => {
  const { values } = useFormikContext<ICirculation>();
  const [addStopIndex, setAddStopIndex] = useState<number | null>(null);
  const [selectedStopIndex, setSelectedStopIndex] = useState<number>(0);

  const isTrainDeleted = values?.statut === CirculationStatus.Supprime;

  const selectedStop = values?.parcours?.pointDeParcours?.[selectedStopIndex];

  return (
    <div className="h-full -mt-4">
      <div className="flex gap-6">
        <div className="w-1/3 max-w-[400px] h-[calc(100vh-225px)] py-6">
          <div className="overflow-y-auto space-y-2">
            {(values?.parcours?.pointDeParcours ?? [])?.map(
              (point, index, arr) => {
                return (
                  <div className="group">
                    {index === 0 && !isTrainDeleted && (
                      <div className="hidden group-hover:block my-2">
                        <AddLineSeparator
                          isOnTop
                          onClick={() => setAddStopIndex(0)}
                        />
                      </div>
                    )}

                    <div
                      key={point?.rang}
                      onClick={() => setSelectedStopIndex(index)}
                      className="border-gray-200 border rounded"
                    >
                      <UpdateRouteStopItem
                        stop={point}
                        index={index}
                        allStops={arr}
                        selectedStop={selectedStop}
                      />
                    </div>

                    {!isTrainDeleted && (
                      <div className="hidden group-hover:block my-2">
                        <AddLineSeparator
                          onClick={() => setAddStopIndex(index + 1)}
                        />
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>
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

      {addStopIndex !== null && (
        <AddStopModal
          index={addStopIndex!}
          open={addStopIndex !== null}
          onClose={() => setAddStopIndex(null)}
        />
      )}
    </div>
  );
};

export default UpdateOperationalRouteTab;
