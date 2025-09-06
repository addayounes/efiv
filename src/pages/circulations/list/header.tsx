import { Input } from "antd";
import { Search } from "lucide-react";
import CirculationsFilters from "./filters";

interface CirculationsListHeaderProps {}

const CirculationsListHeader: React.FC<CirculationsListHeaderProps> = ({}) => {
  return (
    <div className="flex items-center justify-between py-4">
      <Input
        className="max-w-xl w-full"
        placeholder="Rechercher des circulations"
        prefix={<Search size={16} className="text-gray-500" />}
      />
      <CirculationsFilters />
    </div>
  );
};

export default CirculationsListHeader;
