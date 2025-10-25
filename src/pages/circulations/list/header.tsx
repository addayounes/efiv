import { Input } from "antd";
import { Search } from "lucide-react";
import CirculationsFilters from "./filters";
import type { StateSetter } from "@/types/state-setter";

export interface ICirulationsFilters {
  mode?: string;
  query?: string;
  status?: string;
  subMode?: string;
  dateRange: string[];
}

export enum CirculationFilterKeys {
  Mode = "mode",
  Query = "query",
  Status = "status",
  SubMode = "subMode",
  DateRange = "dateRange",
}

export const DEFAULT_CIRCULATIONS_FILTERS: ICirulationsFilters = {
  dateRange: [],
};

interface CirculationsListHeaderProps {
  filters: ICirulationsFilters;
  shownFilters: CirculationFilterKeys[];
  setFilters: StateSetter<ICirulationsFilters>;
}

const CirculationsListHeader: React.FC<CirculationsListHeaderProps> = ({
  filters,
  setFilters,
  shownFilters,
}) => {
  return (
    <div className="flex items-center justify-between py-4">
      {shownFilters.includes(CirculationFilterKeys.Query) ? (
        <Input
          value={filters.query}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, query: e.target.value }))
          }
          className="max-w-xl w-full"
          placeholder="Rechercher des circulations"
          prefix={<Search size={16} className="text-gray-500" />}
        />
      ) : (
        <div />
      )}
      <CirculationsFilters
        filters={filters}
        setFilters={setFilters}
        shownFilters={shownFilters}
      />
    </div>
  );
};

export default CirculationsListHeader;
