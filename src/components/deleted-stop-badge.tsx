import { Tooltip } from "antd";
import { Radio } from "lucide-react";

interface DeletedStopBadgeProps {
  isDiffusable: boolean;
}

const DeletedStopBadge: React.FC<DeletedStopBadgeProps> = ({
  isDiffusable,
}) => {
  return (
    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-xs font-medium">
      {isDiffusable && (
        <Tooltip title="Suppression diffusable en gare">
          <Radio size={14} />
        </Tooltip>
      )}
      Supprimé
    </span>
  );
};

export default DeletedStopBadge;
