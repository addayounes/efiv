import type { ColumnType } from "antd/es/table";

export const useOperationalCirculationsColumns = (): ColumnType[] => {
  return [
    {
      title: "Numéro Commercial",
      dataIndex: "NumeroCommercial",
      key: "NumeroCommercial",
    },
    {
      title: "Mode",
      dataIndex: "mode",
      key: "mode",
    },
    {
      title: "Sous Mode",
      dataIndex: "sousMode",
      key: "sousMode",
    },
    {
      title: "Départ",
      dataIndex: "departureTime",
      key: "departureTime",
    },
    {
      title: "Arrivée",
      dataIndex: "ArrivalTime",
      key: "ArrivalTime",
    },
    {
      title: "Statut",
      dataIndex: "statut",
      key: "statut",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
    },
  ];
};
