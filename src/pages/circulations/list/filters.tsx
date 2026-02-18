import { dayjs } from "@/lib/dayjs";
import { DatePicker, Select } from "antd";
import type { StateSetter } from "@/types/state-setter";
import { CirculationFilterKeys, type ICirulationsFilters } from "./header";
import { CIRCULATION_STATUS_OPTIONS } from "@/constants/circulation-status";
import { CIRCULATION_PUBLISH_STATUS_OPTIONS } from "@/constants/circulation-publish-status";

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
  return (
    <div className="flex items-center gap-4">
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
      {shownFilters.includes(CirculationFilterKeys.LiveStatus) && (
        <Select
          allowClear
          className="w-48"
          value={filters.liveStatus}
          placeholder="Statut de publication"
          options={CIRCULATION_PUBLISH_STATUS_OPTIONS}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, liveStatus: value as string }))
          }
        />
      )}
      {shownFilters.includes(CirculationFilterKeys.DateRange) && (
        <DatePicker.RangePicker
          allowClear
          value={
            (filters.dateRange ?? []).map((d) => dayjs(d)) as [
              dayjs.Dayjs,
              dayjs.Dayjs,
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
