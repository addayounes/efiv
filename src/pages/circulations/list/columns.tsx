import {
  ModeLabelMap,
  CirculationMode,
  SubModeLabelMap,
  CirculationSubMode,
} from "@/constants/mode-sub-mode";
import {
  StatusLabelMap,
  CirculationStatus,
  StatusTagColorMap,
} from "@/constants/circulation-status";
import { Tag } from "antd";
import { dayjs } from "@/lib/dayjs";
import type { ColumnType } from "antd/es/table";
import { DATE_FORMAT_NO_TIME } from "@/constants/date-format";

export const useCirculationsListColumns = (): ColumnType[] => {
  return [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render(_, record) {
        return <span>{dayjs(record.date).format(DATE_FORMAT_NO_TIME)}</span>;
      },
    },
    {
      title: "Numéro Commercial",
      dataIndex: "NumeroCommercial",
      key: "NumeroCommercial",
      render(_, record) {
        return <span className="font-medium">{record.numeroCommercial}</span>;
      },
    },
    {
      title: "Marque Commerciale",
      dataIndex: "marque",
      key: "marque",
      render(_, record) {
        return <span>{record.marqueCommerciale?.libelle ?? "N/A"}</span>;
      },
    },
    {
      title: "Mode / Sous Mode",
      dataIndex: "mode",
      key: "mode",
      render(_, record) {
        return (
          <span>
            {ModeLabelMap[record.mode as CirculationMode] ?? "N/A"} /{" "}
            {SubModeLabelMap[record.sousMode as CirculationSubMode] ?? "N/A"}
          </span>
        );
      },
    },
    {
      title: "Dessertes",
      dataIndex: "parcours",
      key: "parcours",
      render(_, record) {
        return <span>{record.parcours.length ?? 0} dessertes</span>;
      },
    },
    {
      title: "Statut",
      dataIndex: "statut",
      key: "statut",
      render(_, record) {
        return record.statut ? (
          <Tag color={StatusTagColorMap[record.statut as CirculationStatus]}>
            {StatusLabelMap[record.statut as CirculationStatus] ?? "N/A"}
          </Tag>
        ) : (
          "N/A"
        );
      },
    },
    {
      title: "Créer le",
      dataIndex: "createdAt",
      key: "createdAt",
      render(_, record) {
        return <span>{dayjs(record.createdAt).format("L")}</span>;
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
    },
  ];
};
