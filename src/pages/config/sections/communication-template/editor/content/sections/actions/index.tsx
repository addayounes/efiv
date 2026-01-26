import { Input } from "antd";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { Search } from "lucide-react";
import { useAppDispatch } from "@/redux/utils";
import { FlowActionTypes } from "@/constants/flow-action-type";
import type { ActionType } from "@/types/entity/communication";
import { addActionToStage } from "@/redux/slices/communication";

interface EditorActionsProps {
  stageIndex: number;
}

const EditorActions: React.FC<EditorActionsProps> = ({ stageIndex }) => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredActions = FlowActionTypes.filter((action) =>
    action.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const onActionClick = (actionValue: string) => {
    dispatch(addActionToStage({ stageIndex, type: actionValue as ActionType }));
  };

  return (
    <div className="space-y-2 min-w-md">
      <div>
        <Input
          value={searchTerm}
          placeholder="Rechercher des actions"
          onChange={(e) => setSearchTerm(e.target.value)}
          prefix={<Search size={16} className="mr-1 text-gray-500" />}
        />
      </div>
      <p className="text-xs font-medium text-gray-500">Actions</p>
      {filteredActions.length ? (
        <div className="grid grid-cols-2">
          {filteredActions.map((action) => {
            return (
              <div
                key={action.value}
                onClick={() => onActionClick(action.value)}
                className="flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-gray-100"
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded",
                    action.colors.bg,
                    action.colors.text,
                    action.colors.border,
                  )}
                >
                  {action.icon}
                </div>
                <h5 className="font-medium">{action.label}</h5>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-6">
          Aucune action trouvée
        </p>
      )}
    </div>
  );
};

export default EditorActions;
