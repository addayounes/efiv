import CirculationsFilters from "./filters";
import { Input, Segmented, Tooltip } from "antd";
import type { StateSetter } from "@/types/state-setter";
import { CalendarDays, List, Search } from "lucide-react";
import { CirculationsView } from "./tabs/pre-operational";

export interface ICirulationsFilters {
  status?: string;
  liveStatus?: string;
  dateRange: string[];
}

export enum CirculationFilterKeys {
  Query = "query",
  Status = "status",
  LiveStatus = "live-status",
  DateRange = "dateRange",
}

export const DEFAULT_CIRCULATIONS_FILTERS: ICirulationsFilters = {
  dateRange: [],
};

interface CirculationsListHeaderProps {
  view?: CirculationsView;
  filters: ICirulationsFilters;
  shownFilters: CirculationFilterKeys[];
  setFilters: StateSetter<ICirulationsFilters>;
  setView?: React.Dispatch<React.SetStateAction<CirculationsView>>;
  search?: string;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
}

const CirculationsListHeader: React.FC<CirculationsListHeaderProps> = ({
  view,
  search,
  filters,
  setView,
  setSearch,
  setFilters,
  shownFilters,
}) => {
  return (
    <div className="flex items-center justify-between py-4">
      {shownFilters.includes(CirculationFilterKeys.Query) ? (
        <Input
          value={search}
          className="max-w-xl w-full"
          onChange={(e) => setSearch?.(e.target.value)}
          placeholder="Rechercher par numéro de circulation"
          prefix={<Search size={16} className="text-gray-500" />}
        />
      ) : (
        <div />
      )}

      <div className="flex items-center gap-4">
        <CirculationsFilters
          filters={filters}
          setFilters={setFilters}
          shownFilters={shownFilters}
        />

        {view && setView && (
          <Segmented
            value={view}
            onChange={(value) => setView?.(value as CirculationsView)}
            options={[
              {
                value: CirculationsView.LIST,
                icon: (
                  <Tooltip title="Liste">
                    <List size={18} className="text-gray-600 mt-[5px]" />
                  </Tooltip>
                ),
              },
              {
                value: CirculationsView.CALENDAR,
                icon: (
                  <Tooltip title="Calendrier">
                    <CalendarDays
                      size={18}
                      className="text-gray-600 mt-[5px]"
                    />
                  </Tooltip>
                ),
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default CirculationsListHeader;
