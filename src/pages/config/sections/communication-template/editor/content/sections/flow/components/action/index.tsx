import { cn } from "@/utils/cn";
import FlowDeleteButton from "../delete-button";
import FlowActionRenderer from "./action-renderer";
import { useAppDispatch, useAppSelector } from "@/redux/utils";
import type { Action, Stage } from "@/types/entity/communication";
import { FlowActionTypeConfigMap } from "@/constants/flow-action-type";
import { deleteAction, setSelectedAction } from "@/redux/slices/communication";

interface FlowActionProps {
  stage: Stage;
  action: Action;
}

const FlowAction: React.FC<FlowActionProps> = ({ action, stage }) => {
  const dispatch = useAppDispatch();
  const { selectedAction } = useAppSelector((s) => s.communication);

  const handleClickAction = () =>
    dispatch(setSelectedAction({ action, stage }));

  const handleDeleteAction = () =>
    dispatch(deleteAction({ actionId: action?.id, stageId: stage?.id }));

  const actionConfig = FlowActionTypeConfigMap[action.type];

  return (
    <div
      onClick={handleClickAction}
      className={cn(
        "rounded bg-white shadow border p-4 cursor-pointer ",
        selectedAction?.id === action.id
          ? "border-2 border-primary"
          : "hover:border-gray-400 border-gray-200",
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={cn(
            "flex items-center gap-2 px-1.5 rounded w-fit",
            actionConfig.colors.bg,
            actionConfig.colors.text,
          )}
        >
          <div>{actionConfig.icon}</div>
          <p className="text-sm font-medium">{actionConfig.label}</p>
        </div>

        <FlowDeleteButton onDelete={handleDeleteAction} />
      </div>

      <FlowActionRenderer action={action} />
    </div>
  );
};

export default FlowAction;
