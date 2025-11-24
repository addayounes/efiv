import Table from "@/components/table";
import { useCompositionTrainsColumns } from "./columns";

interface CompositionTrainsProps {}

const CompositionTrains: React.FC<CompositionTrainsProps> = ({}) => {
  const columns = useCompositionTrainsColumns();
  return (
    <div>
      <Table bordered data={[]} head={columns} />
    </div>
  );
};

export default CompositionTrains;
