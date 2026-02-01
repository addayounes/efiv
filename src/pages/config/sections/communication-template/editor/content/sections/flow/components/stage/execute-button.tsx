import { Play } from "lucide-react";
import { Button, Popconfirm } from "antd";
import type { Stage } from "@/types/entity/communication";

interface ExecuteStageButtonProps {
  stage: Stage;
}

const ExecuteStageButton: React.FC<ExecuteStageButtonProps> = ({ stage }) => {
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
        type="primary"
        className="!rounded-full"
        onClick={(e) => e.stopPropagation()}
        disabled={stage.actions.length === 0}
        icon={<Play size={18} className="mt-1" />}
      />
    </Popconfirm>
  );
};

export default ExecuteStageButton;
