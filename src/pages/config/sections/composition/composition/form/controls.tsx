import type { SelectedState } from ".";
import DoorControl from "./door-control";
import TrainControl from "./train-control";
import VehicleControl from "./vehicle-control";

interface CreateCompositionControlsProps {
  selected: SelectedState;
}

const CreateCompositionControls: React.FC<CreateCompositionControlsProps> = ({
  selected,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1 border border-gray-200 rounded p-4 bg-white h-fit">
          <h2 className="font-medium text-lg">Matériel Roulant</h2>

          <div className="mt-4">
            {selected.train === -1 ? (
              <div className="flex items-center justify-center py-15">
                <p className="text-gray-500">
                  Sélectionnez un matériel roulant
                </p>
              </div>
            ) : (
              <TrainControl selected={selected} />
            )}
          </div>
        </div>
        <div className="flex-1 border border-gray-200 rounded p-4 bg-white h-fit">
          <h2 className="font-medium text-lg">Voiture</h2>

          <div className="mt-4">
            {selected.car === -1 ? (
              <div className="flex items-center justify-center py-15">
                <p className="text-gray-500">Sélectionnez une voiture</p>
              </div>
            ) : (
              <VehicleControl selected={selected} />
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 border border-gray-200 rounded p-4 bg-white h-fit">
        {selected.car === -1 ? (
          <div className="flex items-center justify-center py-15">
            <p className="text-gray-500">Sélectionnez une voiture</p>
          </div>
        ) : (
          <DoorControl selected={selected} />
        )}
      </div>
    </div>
  );
};

export default CreateCompositionControls;
