import { Modal } from "antd";
import type { PointDeParcour } from "@/types/entity/circulation";

interface DelayModalProps {
  open: boolean;
  onClose: () => void;
  stop: PointDeParcour;
}

const DelayModal: React.FC<DelayModalProps> = ({ open, onClose }) => {
  const onDelay = () => {};

  return (
    <Modal
      open={open}
      onOk={onDelay}
      onCancel={onClose}
      okText="Confirmer"
      cancelText="Annuler"
      title="Annoncer un retard"
    >
      <div></div>
    </Modal>
  );
};

export default DelayModal;
