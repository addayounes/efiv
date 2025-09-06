import type { ColumnType } from "antd/es/table";

export const useCirculationsListColumns = (): ColumnType[] => {
  return [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Parcours",
      dataIndex: "parcours",
      key: "parcours",
    },
    {
      title: "Numéro Commercial",
      dataIndex: "NumeroCommercial",
      key: "NumeroCommercial",
    },
    {
      title: "Nom Commercial",
      dataIndex: "nomCommercial",
      key: "nomCommercial",
    },
    {
      title: "Marque Commerciale",
      dataIndex: "marque",
      key: "marque",
    },
    {
      title: "Ligne",
      dataIndex: "ligne",
      key: "ligne",
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
      title: "Service à bord",
      dataIndex: "serviceABord",
      key: "serviceABord",
    },
    {
      title: "Statut",
      dataIndex: "statut",
      key: "statut",
    },
    {
      title: "Date de création",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
    },
  ];
};
