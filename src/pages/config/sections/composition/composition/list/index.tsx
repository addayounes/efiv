import Table from "@/components/table";
import { useCompositionColumns } from "./columns";

interface CompositionVehiclesProps {}

const Composition: React.FC<CompositionVehiclesProps> = ({}) => {
  const columns = useCompositionColumns();
  return (
    <div>
      <Table bordered data={[]} head={columns} />
    </div>
  );
};

export default Composition;
