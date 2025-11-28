import Table from "@/components/table";
import { useEffect, useState } from "react";
import { useCompositionColumns } from "./columns";
import { getAllCompositionsService } from "@/services/composition";
import type { CreateComposition } from "@/types/dto/create-circulation";

interface CompositionVehiclesProps {}

const Composition: React.FC<CompositionVehiclesProps> = ({}) => {
  const columns = useCompositionColumns();
  const [loading, setLoading] = useState(false);
  const [compositions, setCompositions] = useState<CreateComposition[]>([]);

  useEffect(() => {
    const fetchCompositions = async () => {
      try {
        setLoading(true);
        const data = await getAllCompositionsService();
        setCompositions(data ?? []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompositions();
  }, []);

  return (
    <div>
      <Table
        bordered
        head={columns}
        loading={loading}
        data={compositions ?? []}
      />
    </div>
  );
};

export default Composition;
