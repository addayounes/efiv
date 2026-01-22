import { Button } from "antd";
import { Plus } from "lucide-react";

const AddActionButton: React.FC = () => {
  const handleAddAction = () => {
    // TODO
  };

  return (
    <div className="flex items-center justify-center">
      <Button onClick={handleAddAction}>
        <Plus size={16} />
        Ajouter une action
      </Button>
    </div>
  );
};

export default AddActionButton;
