import { Trash2 } from "lucide-react";
import { Button, Popconfirm } from "antd";

interface FlowDeleteButtonProps {
  onDelete: () => void;
}

const FlowDeleteButton: React.FC<FlowDeleteButtonProps> = ({ onDelete }) => {
  return (
    <Popconfirm
      okText="Supprimer"
      showCancel={false}
      title="Voulez-vous supprimer cette action?"
      okButtonProps={{
        danger: true,
        htmlType: "button",
        onClick: (e) => {
          e.preventDefault();
          onDelete();
        },
      }}
    >
      <Button
        type="text"
        onClick={(e) => e.stopPropagation()}
        className="group/delete-action-button"
        icon={
          <Trash2
            size={18}
            className="mt-1 !text-gray-500 group-hover/delete-action-button:!text-red-500"
          />
        }
      />
    </Popconfirm>
  );
};

export default FlowDeleteButton;
