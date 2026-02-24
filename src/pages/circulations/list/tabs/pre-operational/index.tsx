import CirculationsListHeader, {
  CirculationFilterKeys,
  DEFAULT_CIRCULATIONS_FILTERS,
} from "../../header";
import {
  CirculationListActions,
  useCirculationsListColumns,
} from "../../columns";
import toast from "react-hot-toast";
import Table from "@/components/table";
import { useEffect, useState } from "react";
import { usePagination } from "@/hooks/use-pagination";
import GroupedCirculations from "./grouped-circulations";
import CirculationsCalendarView from "../../calendar-view";
import type { ICirculation } from "@/types/entity/circulation";
import { useDebouncedSearch } from "@/hooks/use-debounced-search";
import { fetchPreOperationalCirculationService } from "@/services/circulations";

interface PreOperationalCirculationsProps {}

export enum CirculationsView {
  LIST = "list",
  CALENDAR = "calendar",
}

const PreOperationalCirculations: React.FC<
  PreOperationalCirculationsProps
> = ({}) => {
  const [loading, setLoading] = useState(false);
  const { debouncedSearch, search, setSearch } = useDebouncedSearch();
  const [groupByTrainNumber, setGroupByTrainNumber] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_CIRCULATIONS_FILTERS);
  const [circulations, setCirculations] = useState<ICirculation[]>([]);
  const [view, setView] = useState<CirculationsView>(CirculationsView.LIST);

  const { setTotal, setPage, ...pagination } = usePagination();

  const columns = useCirculationsListColumns({
    actions: [
      CirculationListActions.VIEW,
      CirculationListActions.EDIT,
      CirculationListActions.HISTORY,
      CirculationListActions.CREATE_VARIANT,
    ],
  });

  const fetchData = async () => {
    try {
      setLoading(true);

      const paginationConfig = {
        page: view === CirculationsView.LIST ? pagination.current : 1,
        pageSize:
          view === CirculationsView.LIST ? pagination.pageSize : 999_999_999,
      };

      const response =
        await fetchPreOperationalCirculationService(paginationConfig);

      setTotal(response?.totalCount || 0);
      setCirculations(response?.items || []);
    } catch (error) {
      console.error("Error fetching circulations:", error);
      toast.error(
        "Une erreur est survenue lors du chargement des circulations.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [view, filters, pagination.current, pagination.pageSize]);

  return (
    <div className="space-y-4">
      <CirculationsListHeader
        view={view}
        search={search}
        filters={filters}
        setView={setView}
        setSearch={setSearch}
        setFilters={setFilters}
        groupByTrainNumber={groupByTrainNumber}
        setGroupByTrainNumber={setGroupByTrainNumber}
        shownFilters={[
          CirculationFilterKeys.Query,
          CirculationFilterKeys.DateRange,
          CirculationFilterKeys.LiveStatus,
        ]}
      />

      {view === CirculationsView.LIST ? (
        groupByTrainNumber ? (
          <GroupedCirculations
            loading={loading}
            circulations={[]}
            pagination={pagination}
          />
        ) : (
          <Table
            bordered
            head={columns}
            loading={loading}
            data={circulations}
            pagination={pagination}
          />
        )
      ) : (
        <CirculationsCalendarView loading={loading} data={circulations} />
      )}
    </div>
  );
};

export default PreOperationalCirculations;
