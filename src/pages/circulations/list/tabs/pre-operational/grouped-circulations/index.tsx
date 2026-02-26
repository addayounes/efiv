import {
  CirculationListActions,
  useCirculationsListColumns,
} from "../../../columns";
import Table from "@/components/table";
import type { TablePaginationConfig } from "antd/lib";
import { useGroupedCirculationsListColumns } from "./columns";
import type { ICirculation } from "@/types/entity/circulation";
import type { GroupedCirculation } from "@/types/entity/grouped-circulations";

interface GroupedCirculationsProps {
  loading: boolean;
  pagination: TablePaginationConfig;
  circulations: GroupedCirculation[];
}

const GroupedCirculations: React.FC<GroupedCirculationsProps> = ({
  loading,
  pagination,
  circulations,
}) => {
  const groupedCirculationsColumns = useGroupedCirculationsListColumns();
  const circulationsColumns = useCirculationsListColumns({
    actions: [
      CirculationListActions.VIEW,
      CirculationListActions.EDIT,
      CirculationListActions.HISTORY,
      CirculationListActions.CREATE_VARIANT,
    ],
  });

  return (
    <div>
      <Table<GroupedCirculation>
        bordered
        loading={loading}
        data={circulations}
        pagination={pagination}
        head={groupedCirculationsColumns}
        expandable={{
          columnTitle: "Détails",
          rowExpandable: (record: GroupedCirculation) =>
            record.circulations?.length > 0,
          expandedRowRender: (record: GroupedCirculation) => (
            <Table<ICirculation>
              size="small"
              bordered
              data={record.circulations}
              head={circulationsColumns}
            />
          ),
        }}
      />
    </div>
  );
};

export default GroupedCirculations;
