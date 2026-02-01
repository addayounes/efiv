import { cn } from "@/utils/cn";
import { Check, Clock } from "lucide-react";

interface StageStatusProps {
  sent?: boolean;
}

const StageStatus: React.FC<StageStatusProps> = ({ sent }) => {
  if (sent == undefined) return null;
  return (
    <div
      className={cn(
        "w-6 h-6 rounded-full flex items-center justify-center",
        sent ? "bg-green-100" : "bg-gray-100",
      )}
    >
      {sent ? (
        <Check size={18} className="text-green-600" />
      ) : (
        <Clock size={18} className="text-gray-500" />
      )}
    </div>
  );
};

export default StageStatus;
