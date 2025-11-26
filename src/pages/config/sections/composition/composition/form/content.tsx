import CreateCompositionPreview from "./preview";
import CreateCompositionControls from "./controls";

interface CreateCompositionContentProps {}

const CreateCompositionContent: React.FC<
  CreateCompositionContentProps
> = ({}) => {
  return (
    <div className="space-y-4">
      <CreateCompositionPreview />
      <CreateCompositionControls />
    </div>
  );
};

export default CreateCompositionContent;
