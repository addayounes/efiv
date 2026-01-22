import { Plus } from "lucide-react";

interface StageConnectorProps {}

const StageConnector: React.FC<StageConnectorProps> = ({}) => {
  return (
    <div className="flex flex-col justify-center items-center group-last:pb-16">
      <div className="h-7 border-r border-gray-400" />
      <div className="flex items-center justify-center w-7 h-7 rounded-full text-gray-400 shadow-md border cursor-pointer bg-white hover:bg-gray-100">
        <Plus />
      </div>
      <div className="h-7 border-r border-gray-400 group-last:hidden" />
    </div>
  );
};

export default StageConnector;
