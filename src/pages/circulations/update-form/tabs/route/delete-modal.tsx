import { Modal } from "antd";
import type { PointDeParcour } from "@/types/entity/circulation";

interface DeleteStopModalProps {
  open: boolean;
  onClose: () => void;
  stop: PointDeParcour;
}

const DeleteStopModal: React.FC<DeleteStopModalProps> = ({ open, onClose }) => {
  const onStopDelete = () => {};

  return (
    <Modal
      open={open}
      onCancel={onClose}
      okText="Supprimer"
      onOk={onStopDelete}
      cancelText="Annuler"
      title="Supprimer la desserte"
      okButtonProps={{ danger: true }}
    >
      <div></div>
    </Modal>
  );
};

export default DeleteStopModal;
