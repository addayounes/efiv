import { Play } from "lucide-react";
import { Button, Popconfirm } from "antd";
import type { Stage } from "@/types/entity/communication";

interface ExecuteStageButtonProps {
  stage: Stage;
}

const ExecuteStageButton: React.FC<ExecuteStageButtonProps> = ({ stage }) => {
  const executeStage = async () => {
    //
  };

  return (
    <Popconfirm
      cancelText="Non"
      okText="Executer"
      onConfirm={executeStage}
      title="Voulez-vous exécuter ce stage?"
    >
      <Button
        type="text"
        className="group/play-button"
        icon={
          <Play
            size={18}
            className="mt-1 !text-gray-500 group-hover/play-button:!text-primary"
          />
        }
      />
    </Popconfirm>
  );
};

export default ExecuteStageButton;
