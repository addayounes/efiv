import { Trash2 } from "lucide-react";
import type { ColumnType } from "antd/es/table";
import CompositionPreview from "@/components/composition-preview";
import type { CreateComposition } from "@/types/dto/create-circulation";

export const useCompositionColumns = (): ColumnType<CreateComposition>[] => {
  return [
    {
      key: "code",
      dataIndex: "code",
      title: "Code",
      render(_, record) {
        return <span className="font-medium">{record.code}</span>;
      },
    },
    {
      key: "libelle",
      dataIndex: "libelle",
      title: "Libelle",
      render(_, record) {
        return <span>{record.name}</span>;
      },
    },
    {
      key: "preview",
      dataIndex: "preview",
      title: "Aperçu",
      render(_, record) {
        return <CompositionPreview composition={record} />;
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
