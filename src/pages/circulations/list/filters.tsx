import {
  getSubModesForMode,
  CIRCULATION_MODE_OPTIONS,
  CirculationMode,
} from "@/constants/mode-sub-mode";
import { DatePicker, Select } from "antd";
import { CIRCULATION_STATUS_OPTIONS } from "@/constants/circulation-status";

interface CirculationsFiltersProps {}

const CirculationsFilters: React.FC<CirculationsFiltersProps> = ({}) => {
  return (
    <div className="flex items-center gap-4">
      <Select
        allowClear
        className="w-30"
        placeholder="Mode"
        options={CIRCULATION_MODE_OPTIONS}
      />
      <Select
        allowClear
        className="w-30"
        placeholder="Sous-mode"
        options={getSubModesForMode(CirculationMode.Ferre)}
      />
      <Select
        allowClear
        className="w-30"
        placeholder="Statut"
        options={CIRCULATION_STATUS_OPTIONS}
      />
      <DatePicker.RangePicker allowClear />
    </div>
  );
};

export default CirculationsFilters;
