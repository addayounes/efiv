import { Pen, Trash2 } from "lucide-react";
import type { ColumnType } from "antd/es/table";
import { Button, Popconfirm, Tooltip } from "antd";
import CompositionPreview from "@/components/composition-preview";
import type { CreateComposition } from "@/types/dto/create-circulation";

export const useCompositionColumns = (): ColumnType<CreateComposition>[] => {
  const onDelete = (record: CreateComposition) => {
    console.log("Delete", record);
  };

  const onEdit = (record: CreateComposition) => {
    console.log("Edit", record);
  };

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
      width: 150,
      align: "right",
      key: "actions",
      title: "Actions",
      dataIndex: "actions",
      render(_, record) {
        return (
          <div className="flex items-center justify-end">
            <Tooltip title="Modifier">
              <Button
                type="text"
                className="-my-2"
                onClick={() => onEdit(record)}
              >
                <Pen className="-mx-1 cursor-pointer" size={16} />
              </Button>
            </Tooltip>
            <Popconfirm
              title={
                <>
                  Voulez-vous vraiment supprimer <b>{record.name}</b> ?
                </>
              }
              okText="Oui"
              cancelText="Non"
              placement="left"
              okButtonProps={{ danger: true }}
              onConfirm={() => onDelete(record)}
            >
              <Tooltip title="Supprimer">
                <Button type="text" className="-my-2">
                  <Trash2
                    className="-mx-1 cursor-pointer text-red-500"
                    size={16}
                  />
                </Button>
              </Tooltip>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
};
