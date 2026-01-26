import { Plus } from "lucide-react";
import { Button, Popover } from "antd";
import EditorActions from "../../../actions";

interface AddActionButtonProps {
  stageIndex: number;
}

const AddActionButton: React.FC<AddActionButtonProps> = ({ stageIndex }) => {
  return (
    <div className="flex items-center justify-center">
      <Popover
        trigger="click"
        placement="right"
        content={<EditorActions stageIndex={stageIndex} />}
      >
        <Button>
          <Plus size={16} />
          Ajouter une action
        </Button>
      </Popover>
    </div>
  );
};

export default AddActionButton;
