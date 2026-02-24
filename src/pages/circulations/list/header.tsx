import { cn } from "@/utils/cn";
import CirculationsFilters from "./filters";
import { Input, Segmented, Tooltip } from "antd";
import type { StateSetter } from "@/types/state-setter";
import { CirculationsView } from "./tabs/pre-operational";
import { CalendarDays, Grid2X2, List, Search } from "lucide-react";

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
  search?: string;
  view?: CirculationsView;
  filters: ICirulationsFilters;
  shownFilters: CirculationFilterKeys[];
  setFilters: StateSetter<ICirulationsFilters>;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
  setView?: React.Dispatch<React.SetStateAction<CirculationsView>>;
  groupByTrainNumber?: boolean;
  setGroupByTrainNumber?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CirculationsListHeader: React.FC<CirculationsListHeaderProps> = ({
  view,
  search,
  filters,
  setView,
  setSearch,
  setFilters,
  shownFilters,
  groupByTrainNumber,
  setGroupByTrainNumber,
}) => {
  return (
    <div className="flex items-center justify-between py-4">
      {shownFilters.includes(CirculationFilterKeys.Query) && setSearch ? (
        <Input
          value={search}
          className="max-w-xl w-full"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par numéro de circulation"
          prefix={<Search size={16} className="text-gray-500" />}
        />
      ) : (
        <div />
      )}

      <div className="flex items-center gap-4">
        {setGroupByTrainNumber && view === CirculationsView.LIST && (
          <div
            onClick={() => setGroupByTrainNumber((v) => !v)}
            className={cn(
              "text-sm flex items-center px-2 py-1 rounded border cursor-pointer duration-200 ease-out",
              groupByTrainNumber
                ? "border-primary bg-primary/5 text-primary"
                : "border-[#D9D9D9] bg-white hover:border-primary text-[#b6b6b6]",
            )}
          >
            <Grid2X2 size={16} className="mr-2" />
            <span>Grouper par</span>
            <span className="ml-1 rounded text-sm font-medium">
              Numéro Commercial
            </span>
          </div>
        )}

        {Boolean(groupByTrainNumber) ? (
          <></>
        ) : (
          <CirculationsFilters
            filters={filters}
            setFilters={setFilters}
            shownFilters={shownFilters}
          />
        )}

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
