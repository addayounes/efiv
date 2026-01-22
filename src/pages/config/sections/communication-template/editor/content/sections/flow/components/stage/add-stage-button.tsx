import { Button } from "antd";
import { Plus } from "lucide-react";

const AddStageButton: React.FC = () => {
  const handleAddStage = () => {
    // TODO
  };

  return (
    <div className="flex items-center justify-center">
      <Button onClick={handleAddStage}>
        <Plus size={16} />
        Ajouter un stage
      </Button>
    </div>
  );
};

export default AddStageButton;
