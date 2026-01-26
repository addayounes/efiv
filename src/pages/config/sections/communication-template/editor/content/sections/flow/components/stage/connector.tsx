import { Plus } from "lucide-react";
import { useAppDispatch } from "@/redux/utils";
import { addStageAtPosition } from "@/redux/slices/communication";

interface StageConnectorProps {
  index: number;
}

const StageConnector: React.FC<StageConnectorProps> = ({ index }) => {
  const dispatch = useAppDispatch();

  const onAddStage = () => {
    dispatch(addStageAtPosition({ position: index + 1 }));
  };

  return (
    <div className="flex flex-col justify-center items-center group-last:pb-16">
      <div className="h-7 border-r border-gray-400" />
      <div
        onClick={onAddStage}
        className="flex items-center justify-center w-7 h-7 rounded-full text-gray-400 shadow-md border cursor-pointer bg-white hover:bg-gray-100"
      >
        <Plus />
      </div>
      <div className="h-7 border-r border-gray-400 group-last:hidden" />
    </div>
  );
};

export default StageConnector;
