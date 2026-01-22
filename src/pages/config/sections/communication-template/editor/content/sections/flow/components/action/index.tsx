import { cn } from "@/utils/cn";
import FlowActionRenderer from "./action-renderer";
import type { Action } from "@/types/entity/communication";
import { FlowActionTypeConfigMap } from "@/constants/flow-action-type";

interface FlowActionProps {
  action: Action;
}

const FlowAction: React.FC<FlowActionProps> = ({ action }) => {
  const actionConfig = FlowActionTypeConfigMap[action.type];

  return (
    <div
      className={cn(
        "rounded bg-white shadow border border-gray-200 p-4 cursor-pointer hover:border-gray-400",
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
