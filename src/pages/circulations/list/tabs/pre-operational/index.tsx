import CirculationsListHeader, {
  CirculationFilterKeys,
  DEFAULT_CIRCULATIONS_FILTERS,
} from "../../header";
import {
  CirculationListActions,
  useCirculationsListColumns,
} from "../../columns";
import {
  fetchGroupedCirculationsService,
  fetchPreOperationalCirculationService,
} from "@/services/circulations";
import toast from "react-hot-toast";
import Table from "@/components/table";
import { useEffect, useState } from "react";
import { usePagination } from "@/hooks/use-pagination";
import GroupedCirculations from "./grouped-circulations";
import CirculationsCalendarView from "../../calendar-view";
import type { ICirculation } from "@/types/entity/circulation";
import { useDebouncedSearch } from "@/hooks/use-debounced-search";
import type { GroupedCirculation } from "@/types/entity/grouped-circulations";
import { mapRawGroupedCirculationsToGroupedCirculations } from "./grouped-circulations/mapper";

interface PreOperationalCirculationsProps {}

export enum CirculationsView {
  LIST = "list",
  CALENDAR = "calendar",
}

const PreOperationalCirculations: React.FC<
  PreOperationalCirculationsProps
> = ({}) => {
  const [loading, setLoading] = useState(false);
  const { search, setSearch } = useDebouncedSearch();
  const [groupByTrainNumber, setGroupByTrainNumber] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_CIRCULATIONS_FILTERS);
  const [circulations, setCirculations] = useState<ICirculation[]>([]);
  const [view, setView] = useState<CirculationsView>(CirculationsView.LIST);
  const [groupedCirculations, setGroupedCirculations] = useState<
    GroupedCirculation[]
  >([]);

  const { setTotal, setPage, ...pagination } = usePagination();

  const columns = useCirculationsListColumns({
    actions: [
      CirculationListActions.VIEW,
      CirculationListActions.EDIT,
      CirculationListActions.HISTORY,
      CirculationListActions.CREATE_VARIANT,
    ],
  });

  const fetchPreOperationalData = async () => {
    try {
      setLoading(true);

      const paginationConfig = {
        page: view === CirculationsView.LIST ? pagination.current : 1,
        pageSize:
          view === CirculationsView.LIST ? pagination.pageSize : 999_999_999,
      };

      if (groupByTrainNumber) {
        const response = await fetchGroupedCirculationsService({
          ...paginationConfig,
          startDate: filters.dateRange[0],
          endDate: filters.dateRange[1],
        });

        setGroupedCirculations(
          mapRawGroupedCirculationsToGroupedCirculations(response?.items || []),
        );
        setTotal(response?.totalCount || 0);
      } else {
        const response =
          await fetchPreOperationalCirculationService(paginationConfig);

        setTotal(response?.totalCount || 0);
        setCirculations(response?.items || []);
      }
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
    fetchPreOperationalData();
  }, [
    view,
    filters,
    groupByTrainNumber,
    pagination.current,
    pagination.pageSize,
  ]);

  useEffect(() => {
    setPage(1);
  }, [filters, groupByTrainNumber]);

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
            pagination={pagination}
            circulations={groupedCirculations}
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
