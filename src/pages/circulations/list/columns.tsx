import {
  Eye,
  Plus,
  Trash,
  Pencil,
  History,
  EllipsisVertical,
} from "lucide-react";
import {
  ModeLabelMap,
  CirculationMode,
  SubModeLabelMap,
  CirculationSubMode,
} from "@/constants/mode-sub-mode";
import {
  PublishStatusLabelMap,
  PublishStatusTagColorMap,
} from "@/constants/circulation-publish-status";
import { dayjs } from "@/lib/dayjs";
import { Dropdown, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import type { ColumnType } from "antd/es/table";
import { __routes__ } from "@/constants/routes";
import type { ItemType } from "antd/es/menu/interface";
import { DATE_FORMAT_NO_TIME } from "@/constants/date-format";
import type { ICirculation } from "@/types/entity/circulation";

export enum CirculationListActions {
  VIEW = "view",
  EDIT = "edit",
  DELETE = "delete",
  HISTORY = "history",
  CREATE_VARIANT = "create_variant",
}

export const useCirculationsListColumns = (options?: {
  actions: CirculationListActions[];
}): ColumnType<ICirculation>[] => {
  const navigate = useNavigate();

  // TODO: handle click
  const actionsMenu = (record: ICirculation): ItemType[] => [
    {
      key: CirculationListActions.VIEW,
      label: (
        <span className="flex items-center gap-2">
          <Eye className="text-gray-600" size={16} />
          Détails
        </span>
      ),
    },
    {
      key: CirculationListActions.EDIT,
      label: (
        <span className="flex items-center gap-2">
          <Pencil className="text-gray-600" size={16} />
          Modifier
        </span>
      ),
    },
    {
      key: CirculationListActions.CREATE_VARIANT,
      label: (
        <span className="flex items-center gap-2">
          <Plus className="text-gray-600" size={16} />
          Créer une variation
        </span>
      ),
      onClick: () => {
        navigate(__routes__.Circulations.Create, {
          state: { ...record },
        });
      },
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
    {
      key: CirculationListActions.DELETE,
      label: (
        <span className="flex items-center gap-2 group">
          <Trash className="text-red-600 group-hover:text-white" size={16} />
          Supprimer
        </span>
      ),
      danger: true,
    },
  ];

  return [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render(_, record) {
        return <span>{dayjs(record?.date).format(DATE_FORMAT_NO_TIME)}</span>;
      },
    },
    {
      title: "Numéro Commercial",
      dataIndex: "NumeroCommercial",
      key: "NumeroCommercial",
      render(_, record) {
        return <span className="font-medium">{record?.numeroCommercial}</span>;
      },
    },
    {
      title: "Marque Commerciale",
      dataIndex: "marque",
      key: "marque",
      render(_, record) {
        return <span>{record?.marqueCommerciale?.libelle ?? "N/A"}</span>;
      },
    },
    {
      title: "Mode / Sous Mode",
      dataIndex: "mode",
      key: "mode",
      render(_, record) {
        return (
          <span>
            {ModeLabelMap[record?.mode as CirculationMode] ?? "N/A"} /{" "}
            {SubModeLabelMap[record?.sousMode as CirculationSubMode] ?? "N/A"}
          </span>
        );
      },
    },
    {
      title: "Via",
      dataIndex: "parcours",
      key: "parcours",
      render(_, record) {
        return (
          <span>
            {(record?.parcours?.pointDeParcours?.length ?? 0) === 2
              ? "Direct"
              : `${
                  (record?.parcours?.pointDeParcours?.length ?? 0) - 2
                } dessertes`}
          </span>
        );
      },
    },
    {
      title: "Statut de publication",
      dataIndex: "publishStatus",
      key: "publishStatus",
      render(_, record) {
        const statusLabel = PublishStatusLabelMap[record.publishStatus];
        const statusColor = PublishStatusTagColorMap[record.publishStatus];
        return statusLabel ? (
          <Tag color={statusColor}>{statusLabel}</Tag>
        ) : (
          "N/A"
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
              menu={{
                items: actionsMenu(record).filter((a) =>
                  options?.actions.includes(a!.key as CirculationListActions)
                ),
              }}
            >
              <EllipsisVertical className="cursor-pointer" size={20} />
            </Dropdown>
          </div>
        );
      },
    },
  ];
};
