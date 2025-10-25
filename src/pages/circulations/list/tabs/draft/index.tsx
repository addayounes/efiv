import toast from "react-hot-toast";
import Table from "@/components/table";
import { useEffect, useState } from "react";
import { useCirculationsListColumns } from "../../columns";

interface DraftCirculationsProps {}

const DraftCirculations: React.FC<DraftCirculationsProps> = ({}) => {
  const columns = useCirculationsListColumns();
  const [loading, setLoading] = useState(false);

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
  }, []);

  return (
    <div>
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

export default DraftCirculations;
