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
      <CreateCompositionGeneralInfo />
      <CreateCompositionPreview selected={selected} setSelected={setSelected} />
      <CreateCompositionControls selected={selected} />
    </div>
  );
};

export default CreateCompositionContent;
