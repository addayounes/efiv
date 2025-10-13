import Table from "@/components/table";
import { useCirculationsListColumns } from "./columns";

interface CirculationsTableProps {}

const CirculationsTable: React.FC<CirculationsTableProps> = ({}) => {
  const columns = useCirculationsListColumns();
  return (
    <div>
      <Table
        data={[]}
        head={columns}
        loading={false}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default CirculationsTable;
