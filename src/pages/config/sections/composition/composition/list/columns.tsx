import type { ColumnType } from "antd/es/table";

export const useCompositionCompositionColumns = (): ColumnType<any>[] => {
  return [
    {
      key: "libelle",
      dataIndex: "libelle",
      title: "Libelle",
      render(_, record) {
        return <span>-</span>;
      },
    },
    {
      key: "serie",
      dataIndex: "serie",
      title: "Série / Sous-série",
      render(_, record) {
        return <span>-</span>;
      },
    },
    {
      key: "voitures",
      dataIndex: "voitures",
      title: "Nombre de voitures",
      render(_, record) {
        return <span>-</span>;
      },
    },
  ];
};
