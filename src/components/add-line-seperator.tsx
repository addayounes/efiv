import { Button } from "antd";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { Plus } from "lucide-react";

interface AddLineSeparatorProps {
  isOnTop?: boolean;
  onClick?: () => void;
}

const AddLineSeparator: React.FC<AddLineSeparatorProps> = ({
  onClick,
  isOnTop,
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="flex pl-6">
      {isOnTop ? (
        <div
          className={cn(
            "w-6 h-5 rounded-tl translate-y-3 border-l border-t border-gray-300",
            { "border-primary": hovered }
          )}
        />
      ) : (
        <div
          className={cn(
            "w-6 h-5 rounded-bl -mt-2 border-l border-b border-gray-300",
            { "border-primary": hovered }
          )}
        />
      )}
      <Button
        size="small"
        onClick={onClick}
        icon={<Plus size={16} />}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        Ajouter une desserte
      </Button>
    </div>
  );
};

export default AddLineSeparator;
