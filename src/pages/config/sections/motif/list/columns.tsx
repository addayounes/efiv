import { Trash2 } from "lucide-react";
import type { ColumnType } from "antd/es/table";
import type { IMotifRetard } from "@/types/entity/motif-retard";

export const useMotifRetardColumns = (): ColumnType<IMotifRetard>[] => {
  return [
    {
      key: "interne",
      dataIndex: "interne",
      title: "Interne",
      ellipsis: true,
      render(_, record) {
        return <span className="font-medium">{record.interne}</span>;
      },
    },
    {
      key: "voyageur",
      dataIndex: "voyageur",
      title: "Voyageur",
      ellipsis: true,
      render(_, record) {
        return <span className="font-medium">{record.externe}</span>;
      },
    },
    {
      width: 80,
      align: "right",
      key: "actions",
      title: "Actions",
      dataIndex: "actions",
      render(_) {
        return (
          <div className="flex justify-end px-4">
            <Trash2 className="text-red-500 cursor-pointer" size={16} />
          </div>
        );
      },
    },
  ];
};
