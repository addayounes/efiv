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
import type { ICirculation } from "@/types/entity/circulation";
import { fetchPreOperationalCirculationService } from "@/services/circulations";

interface PreOperationalCirculationsProps {}

const PreOperationalCirculations: React.FC<
  PreOperationalCirculationsProps
> = ({}) => {
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_CIRCULATIONS_FILTERS);
  const [circulations, setCirculations] = useState<ICirculation[]>([]);

  const { setTotal, ...pagination } = usePagination();

  const columns = useCirculationsListColumns({
    actions: [
      CirculationListActions.VIEW,
      CirculationListActions.EDIT,
      CirculationListActions.HISTORY,
      CirculationListActions.CREATE_VARIANT,
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetchPreOperationalCirculationService({
          page: pagination.current,
          pageSize: pagination.pageSize,
        });

        setTotal(response?.totalCount || 0);
        setCirculations(response?.items || []);
      } catch (error) {
        console.error("Error fetching circulations:", error);
        toast.error(
          "Une erreur est survenue lors du chargement des circulations."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, pagination.current, pagination.pageSize]);

  return (
    <div className="space-y-4">
      <CirculationsListHeader
        filters={filters}
        setFilters={setFilters}
        shownFilters={[
          CirculationFilterKeys.Mode,
          CirculationFilterKeys.Query,
          CirculationFilterKeys.Status,
          CirculationFilterKeys.SubMode,
          CirculationFilterKeys.DateRange,
        ]}
      />

      <Table
        bordered
        head={columns}
        loading={loading}
        data={circulations}
        pagination={pagination}
      />
    </div>
  );
};

export default PreOperationalCirculations;
