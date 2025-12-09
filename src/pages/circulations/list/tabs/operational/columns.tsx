import {
  StatusLabelMap,
  StatusTagColorMap,
  type CirculationStatus,
} from "@/constants/circulation-status";
import { Dropdown, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import type { ColumnType } from "antd/es/table";
import { __routes__ } from "@/constants/routes";
import TrainParcours from "@/components/parcours";
import { CirculationListActions } from "../../columns";
import type { ItemType } from "antd/es/menu/interface";
import { getParcoursStatuses } from "@/utils/parcours.utils";
import type { ICirculation } from "@/types/entity/circulation";
import { EllipsisVertical, History, Pencil } from "lucide-react";

export const useOperationalCirculationsColumns =
  (): ColumnType<ICirculation>[] => {
    const navigate = useNavigate();

    const actionsMenu = (record: ICirculation): ItemType[] => [
      {
        key: CirculationListActions.EDIT,
        label: (
          <span className="flex items-center gap-2">
            <Pencil className="text-gray-600" size={16} />
            Modifier
          </span>
        ),
        onClick: () =>
          navigate(
            __routes__.Circulations.OperationalUpdate.replace(":id", record.id)
          ),
      },
      {
        key: CirculationListActions.HISTORY,
        label: (
          <span className="flex items-center gap-2">
            <History className="text-gray-600" size={16} />
            Historique des modifications
          </span>
        ),
      },
    ];

    return [
      {
        title: "Numéro Commercial",
        dataIndex: "NumeroCommercial",
        key: "NumeroCommercial",
        render(_, record) {
          return (
            <span className="font-medium">{record?.numeroCommercial}</span>
          );
        },
      },
      {
        width: 300,
        title: "Marque Commerciale",
        dataIndex: "marqueCommerciale",
        key: "marqueCommerciale",
        render(_, record) {
          return <span>{record?.marqueCommerciale?.libelle} </span>;
        },
      },
      {
        title: "Parcours",
        dataIndex: "parcours",
        key: "parcours",
        width: 500,
        render(_, record) {
          return (
            <TrainParcours parcours={record?.parcours?.pointDeParcours ?? []} />
          );
        },
      },
      {
        title: "Statut parcours",
        dataIndex: "statut",
        key: "statut",
        render(_, record) {
          const parcoursStatus = getParcoursStatuses(record?.parcours);
          return (
            <div>
              {parcoursStatus.map((status) => (
                <Tag className="font-medium" color={status.color}>
                  {status.label}
                </Tag>
              ))}
            </div>
          );
        },
      },
      {
        title: "Statut circulation",
        dataIndex: "statut",
        key: "statut",
        render(_, record) {
          return (
            <Tag
              className="font-medium"
              color={StatusTagColorMap[record?.statut as CirculationStatus]}
            >
              {StatusLabelMap[record?.statut as CirculationStatus] ?? "N/A"}
            </Tag>
          );
        },
      },
      {
        width: 50,
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
        render(_, record) {
          return (
            <div className="flex items-center gap-4">
              <Dropdown
                trigger={["click"]}
                placement="bottomRight"
                menu={{ items: actionsMenu(record) }}
              >
                <EllipsisVertical className="cursor-pointer" size={20} />
              </Dropdown>
            </div>
          );
        },
      },
    ];
  };
