import type React from "react";
import type { SelectedState } from ".";
import CreateCompositionPreview from "./preview";
import CreateCompositionControls from "./controls";
import CreateCompositionGeneralInfo from "./general-info";

interface CreateCompositionContentProps {
  selected: SelectedState;
  setSelected: React.Dispatch<React.SetStateAction<SelectedState>>;
}

const CreateCompositionContent: React.FC<CreateCompositionContentProps> = ({
  selected,
  setSelected,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="basis-1/4">
          <CreateCompositionGeneralInfo />
        </div>
        <div className="basis-full">
          <CreateCompositionPreview
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </div>
      <CreateCompositionControls selected={selected} />
    </div>
  );
};

export default CreateCompositionContent;
