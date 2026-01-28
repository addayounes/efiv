import { Button } from "antd";
import { Plus } from "lucide-react";
import { useAppDispatch } from "@/redux/utils";
import { addStageAtPosition } from "@/redux/slices/communication";

const AddStageButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleAddStage = () => {
    dispatch(addStageAtPosition({ position: 0 }));
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
