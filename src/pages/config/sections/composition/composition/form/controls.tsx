import React from "react";
import type { SelectedState } from ".";

interface CreateCompositionControlsProps {
  selected: SelectedState;
  setSelected: React.Dispatch<React.SetStateAction<SelectedState>>;
}

const CreateCompositionControls: React.FC<CreateCompositionControlsProps> = ({
  selected,
  setSelected,
}) => {
  return (
    <div className="border border-gray-200 rounded p-4 bg-white">
      CreateCompositionControls
    </div>
  );
};

export default CreateCompositionControls;
