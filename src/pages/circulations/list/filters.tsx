import {
  CirculationMode,
  getSubModesForMode,
  CIRCULATION_MODE_OPTIONS,
} from "@/constants/mode-sub-mode";
import { useMemo } from "react";
import { dayjs } from "@/lib/dayjs";
import { DatePicker, Select } from "antd";
import type { StateSetter } from "@/types/state-setter";
import { CirculationFilterKeys, type ICirulationsFilters } from "./header";
import { CIRCULATION_STATUS_OPTIONS } from "@/constants/circulation-status";

interface CirculationsFiltersProps {
  filters: ICirulationsFilters;
  shownFilters: CirculationFilterKeys[];
  setFilters: StateSetter<ICirulationsFilters>;
}

const CirculationsFilters: React.FC<CirculationsFiltersProps> = ({
  filters,
  setFilters,
  shownFilters,
}) => {
  const subModes = useMemo(
    () => getSubModesForMode(filters.mode as CirculationMode),
    [filters.mode]
  );
  return (
    <div className="flex items-center gap-4">
      {shownFilters.includes(CirculationFilterKeys.Mode) && (
        <Select
          allowClear
          className="w-30"
          placeholder="Mode"
          value={filters.mode}
          options={CIRCULATION_MODE_OPTIONS}
          onChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              subMode: undefined,
              mode: value as string,
            }))
          }
        />
      )}
      {shownFilters.includes(CirculationFilterKeys.SubMode) && (
        <Select
          allowClear
          className="w-30"
          options={subModes}
          placeholder="Sous-mode"
          value={filters.subMode}
          disabled={!filters.mode || subModes.length === 0}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, subMode: value as string }))
          }
        />
      )}
      {shownFilters.includes(CirculationFilterKeys.Status) && (
        <Select
          allowClear
          className="w-30"
          placeholder="Statut"
          value={filters.status}
          options={CIRCULATION_STATUS_OPTIONS}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, status: value as string }))
          }
        />
      )}
      {shownFilters.includes(CirculationFilterKeys.DateRange) && (
        <DatePicker.RangePicker
          allowClear
          value={
            (filters.dateRange ?? []).map((d) => dayjs(d)) as [
              dayjs.Dayjs,
              dayjs.Dayjs
            ]
          }
          onChange={(_, dateStrings) =>
            setFilters((prev) => ({ ...prev, dateRange: dateStrings }))
          }
        />
      )}
    </div>
  );
};

export default CirculationsFilters;
