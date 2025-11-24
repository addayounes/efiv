import Table from "@/components/table";
import { useCompositionVehiclesColumns } from "./columns";

interface CompositionVehiclesProps {}

const CompositionVehicles: React.FC<CompositionVehiclesProps> = ({}) => {
  const columns = useCompositionVehiclesColumns();
  return (
    <div>
      <Table bordered data={[]} head={columns} />
    </div>
  );
};

export default CompositionVehicles;
