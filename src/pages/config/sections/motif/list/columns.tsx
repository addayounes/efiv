// import { Trash2 } from "lucide-react";
import type { ColumnType } from "antd/es/table";
// import { Button, Popconfirm, Tooltip } from "antd";
import type { IMotifRetard } from "@/types/entity/motif-retard";

export const useMotifRetardColumns = (): ColumnType<IMotifRetard>[] => {
  // const onDelete = (record: IMotifRetard) => {
  //   console.log("Delete", record);
  // };

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
    // {
    //   width: 80,
    //   align: "right",
    //   key: "actions",
    //   title: "Actions",
    //   dataIndex: "actions",
    //   render(_, record) {
    //     return (
    //       <div className="flex justify-end px-4">
    //         <Popconfirm
    //           title={<>Voulez-vous vraiment supprimer ce motif ?</>}
    //           okText="Oui"
    //           cancelText="Non"
    //           placement="left"
    //           okButtonProps={{ danger: true }}
    //           onConfirm={() => onDelete(record)}
    //         >
    //           <Tooltip title="Supprimer">
    //             <Button type="text" className="-my-2">
    //               <Trash2
    //                 className="-mx-1 cursor-pointer text-red-500"
    //                 size={16}
    //               />
    //             </Button>
    //           </Tooltip>
    //         </Popconfirm>{" "}
    //       </div>
    //     );
    //   },
    // },
  ];
};
