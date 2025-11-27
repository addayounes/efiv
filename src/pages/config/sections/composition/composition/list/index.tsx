import Table from "@/components/table";
import { useEffect, useState } from "react";
import { useCompositionColumns } from "./columns";
import { getAllCompositionsService } from "@/services/composition";
import type { CreateComposition } from "@/types/dto/create-circulation";

interface CompositionVehiclesProps {}

const Composition: React.FC<CompositionVehiclesProps> = ({}) => {
  const columns = useCompositionColumns();
  const [compositions, setCompositions] = useState<CreateComposition[]>([]);

  useEffect(() => {
    const fetchCompositions = async () => {
      const data = await getAllCompositionsService();
      setCompositions(data ?? []);
    };

    fetchCompositions();
  }, []);

  return (
    <div>
      <Table bordered data={compositions ?? []} head={columns} />
    </div>
  );
};

export default Composition;
