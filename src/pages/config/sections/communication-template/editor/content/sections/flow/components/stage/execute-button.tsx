import { Play } from "lucide-react";
import { Button, Popconfirm } from "antd";
import type { Stage } from "@/types/entity/communication";

interface ExecuteStageButtonProps {
  stage: Stage;
}

const ExecuteStageButton: React.FC<ExecuteStageButtonProps> = ({}) => {
  const executeStage = async (e?: React.MouseEvent<HTMLElement>) => {
    e?.stopPropagation();
  };

  return (
    <Popconfirm
      okText="Executer"
      showCancel={false}
      onConfirm={executeStage}
      title="Voulez-vous exécuter ce stage?"
      okButtonProps={{
        htmlType: "button",
        onClick: (e) => e?.stopPropagation(),
      }}
    >
      <Button
        type="text"
        onClick={(e) => e.stopPropagation()}
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
