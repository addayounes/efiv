import { Badge } from "antd";
import { __routes__ } from "@/constants/routes";
import type { ColumnType } from "antd/es/table";
import TrainParcours from "@/components/parcours";
import type { GroupedCirculation } from "@/types/entity/grouped-circulations";

export const useGroupedCirculationsListColumns =
  (): ColumnType<GroupedCirculation>[] => {
    return [
      {
        title: "Numéro Commercial",
        dataIndex: "numeroCommercial",
        key: "numeroCommercial",
        render(_, record) {
          return (
            <Badge
              showZero
              offset={[25, 7]}
              className="font-medium"
              count={record.circulations?.length ?? 0}
            >
              {record.numeroCommercial}
            </Badge>
          );
        },
      },
      {
        title: "Marque Commerciale",
        dataIndex: "marque",
        key: "marque",
        render(_, record) {
          return (
            <span>
              {record?.circulations?.[0]?.marqueCommerciale?.libelle ?? "N/A"}
            </span>
          );
        },
      },
      {
        title: "Parcours",
        dataIndex: "parcours",
        key: "parcours",
        width: 500,
        render(_, record) {
          return (
            <TrainParcours
              parcours={
                record?.circulations?.[0]?.parcours?.pointDeParcours ?? []
              }
            />
          );
        },
      },
    ];
  };
