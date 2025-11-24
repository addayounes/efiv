import Table from "@/components/table";
import { useCompositionCompositionColumns } from "./columns";

interface CompositionVehiclesProps {}

const CompositionComposition: React.FC<CompositionVehiclesProps> = ({}) => {
  const columns = useCompositionCompositionColumns();
  return (
    <div>
      <Table bordered data={[]} head={columns} />
    </div>
  );
};

export default CompositionComposition;
