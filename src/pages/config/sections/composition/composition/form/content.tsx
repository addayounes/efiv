import type React from "react";
import type { SelectedState } from ".";
import CreateCompositionPreview from "./preview";
import CreateCompositionControls from "./controls";

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
      <CreateCompositionPreview selected={selected} setSelected={setSelected} />
      <CreateCompositionControls
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
};

export default CreateCompositionContent;
