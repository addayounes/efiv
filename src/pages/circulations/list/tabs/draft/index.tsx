import {
  CirculationListActions,
  useCirculationsListColumns,
} from "../../columns";
import toast from "react-hot-toast";
import Table from "@/components/table";
import { useEffect, useState } from "react";
import type { ICirculation } from "@/types/entity/circulation";
import { fetchDraftCirculationService } from "@/services/circulations";

interface DraftCirculationsProps {}

const DraftCirculations: React.FC<DraftCirculationsProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const [circulations, setCirculations] = useState<ICirculation[]>([]);

  const columns = useCirculationsListColumns({
    actions: [CirculationListActions.DELETE, CirculationListActions.EDIT],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchDraftCirculationService({
          endDate: new Date().toISOString(),
        });
        if (!data) throw new Error("No data received");
        setCirculations(data);
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
  }, []);

  return (
    <div>
      <Table<ICirculation>
        bordered
        head={columns}
        loading={loading}
        data={circulations}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default DraftCirculations;
