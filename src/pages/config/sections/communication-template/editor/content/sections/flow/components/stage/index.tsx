import { cn } from "@/utils/cn";
import FlowAction from "../action";
import StageConnector from "./connector";
import FlowDeleteButton from "../delete-button";
import ExecuteStageButton from "./execute-button";
import AddActionButton from "../action/add-action-button";
import type { Stage } from "@/types/entity/communication";
import { getShortPreviewText } from "@/utils/flow-stage.utils";
import { useAppDispatch, useAppSelector } from "@/redux/utils";
import { deleteStage, setSelectedStage } from "@/redux/slices/communication";

interface FlowStageProps {
  stage: Stage;
  index: number;
}

const FlowStage: React.FC<FlowStageProps> = ({ stage, index }) => {
  const dispatch = useAppDispatch();
  const { selectedStage } = useAppSelector((s) => s.communication);

  const handleOnClick = () => dispatch(setSelectedStage(stage));

  const handleDeleteStage = () => dispatch(deleteStage(stage.id));

  return (
    <div className="group relative">
      <div
        className={cn(
          "rounded bg-white shadow-md w-xl border transition-transform ease-out duration-200",
          selectedStage?.id === stage.id
            ? "border-2 border-primary"
            : "border-transparent hover:border-gray-400",
        )}
      >
        {/* Header */}
        <div
          onClick={handleOnClick}
          className="p-4 flex items-center justify-between border-b border-gray-200 cursor-pointer "
        >
          <h3 className="text-sm font-medium">{stage.name}</h3>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">
              {getShortPreviewText(stage.timingConfig)}
            </p>
            <ExecuteStageButton stage={stage} />
            <FlowDeleteButton onDelete={handleDeleteStage} />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          {stage.actions.map((action) => {
            return <FlowAction action={action} stage={stage} key={action.id} />;
          })}
          <div className="mt-4">
            <AddActionButton stageIndex={index} />
          </div>
        </div>
      </div>

      {/* Connector */}
      <StageConnector index={index} />

      {/* Stage Number */}
      <div className="absolute -left-14 top-1 w-12 h-12 bg-white text-gray-400 rounded flex items-center justify-center font-medium shadow-md">
        {index + 1}
      </div>
    </div>
  );
};

export default FlowStage;
