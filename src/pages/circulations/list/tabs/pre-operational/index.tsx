import CirculationsListHeader, {
  CirculationFilterKeys,
  DEFAULT_CIRCULATIONS_FILTERS,
} from "../../header";
import toast from "react-hot-toast";
import Table from "@/components/table";
import { useEffect, useState } from "react";
import { useCirculationsListColumns } from "../../columns";

interface PreOperationalCirculationsProps {}

const PreOperationalCirculations: React.FC<
  PreOperationalCirculationsProps
> = ({}) => {
  const columns = useCirculationsListColumns();
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_CIRCULATIONS_FILTERS);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch data based on filters
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
  }, [filters]);

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
        data={[]}
        head={columns}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default PreOperationalCirculations;
