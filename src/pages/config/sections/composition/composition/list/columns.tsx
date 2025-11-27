import type { ColumnType } from "antd/es/table";
import type { CreateComposition } from "@/types/dto/create-circulation";
import { Trash2 } from "lucide-react";

export const useCompositionColumns = (): ColumnType<CreateComposition>[] => {
  return [
    {
      key: "libelle",
      dataIndex: "libelle",
      title: "Libelle",
      render(_, record) {
        return <span className="font-medium">{record.name}</span>;
      },
    },
    {
      key: "preview",
      dataIndex: "preview",
      title: "Aperçu",
      render(_, record) {
        return <span>-</span>;
      },
    },
    {
      width: 80,
      align: "right",
      key: "actions",
      title: "Actions",
      dataIndex: "actions",
      render(_, record) {
        return (
          <div className="flex justify-end px-4">
            <Trash2 className="text-red-500 cursor-pointer" size={16} />
          </div>
        );
      },
    },
  ];
};
