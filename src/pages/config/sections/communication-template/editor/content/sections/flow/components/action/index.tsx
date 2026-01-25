import { cn } from "@/utils/cn";
import FlowActionRenderer from "./action-renderer";
import type { Action } from "@/types/entity/communication";
import { useAppDispatch, useAppSelector } from "@/redux/utils";
import { setSelectedAction } from "@/redux/slices/communication";
import { FlowActionTypeConfigMap } from "@/constants/flow-action-type";

interface FlowActionProps {
  action: Action;
}

const FlowAction: React.FC<FlowActionProps> = ({ action }) => {
  const dispatch = useAppDispatch();
  const { selectedAction } = useAppSelector((s) => s.communication);

  const handleClickAction = () => dispatch(setSelectedAction(action));

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

      <FlowActionRenderer action={action} />
    </div>
  );
};

export default FlowAction;
