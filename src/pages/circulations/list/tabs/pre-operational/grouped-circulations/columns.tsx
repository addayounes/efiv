import { __routes__ } from "@/constants/routes";
import type { ColumnType } from "antd/es/table";
import type { GroupedCirculation } from "@/types/entity/grouped-circulations";

export const useGroupedCirculationsListColumns =
  (): ColumnType<GroupedCirculation>[] => {
    return [
      {
        title: "Numéro Commercial",
        dataIndex: "numeroCommercial",
        key: "numeroCommercial",
        render(_, record) {
          return <span className="font-medium">{record.numeroCommercial}</span>;
        },
      },
      {
        title: "Circulations",
        dataIndex: "circulations",
        key: "circulations",
        render(_, record) {
          return <span>{record?.circulations?.length ?? 0}</span>;
        },
      },
    ];
  };
