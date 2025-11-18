import {
  type PointDeParcour,
  PointDeParcourStatut,
  type ICirculation,
} from "@/types/entity/circulation";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { Checkbox, Modal, Select } from "antd";

interface AddStopModalProps {
  index: number;
  open: boolean;
  onClose: () => void;
  stop: PointDeParcour;
}

const motifs = [
  {
    value: "SUPPRIME",
    label: "La desserte ne doit plus être effectuée",
  },
  {
    value: "TEMPORAIREMENT_SUPPRIME",
    label: "La desserte est temporairement supprimée",
  },
];

const AddStopModal: React.FC<AddStopModalProps> = ({
  open,
  stop,
  index,
  onClose,
}) => {
  const [motif, setMotif] = useState<string>();
  const [isStreamable, setIsStreamable] = useState(false);
  // const { values, setFieldValue } = useFormikContext<ICirculation>();

  const onStopAdd = () => {
    onClose();
  };

  useEffect(() => {
    setMotif(undefined);
    setIsStreamable(false);
  }, [stop]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      okText="Ajouter"
      onOk={onStopAdd}
      cancelText="Annuler"
      title="Ajouter une desserte"
      // okButtonProps={{ danger: true }}
    >
      <div className="py-4">
        <div>
          <label
            htmlFor="motif-select"
            className="text-sm text-gray-700 font-medium"
          >
            Quelle est la raison de la suppression de cette desserte ?
          </label>
          <div className="my-2">
            <Select
              allowClear
              size="large"
              value={motif}
              options={motifs}
              id="motif-select"
              className="w-full"
              onChange={setMotif}
              placeholder="Sélectionner un motif"
            />
          </div>
          <Checkbox
            checked={isStreamable}
            onChange={(e) => setIsStreamable(e.target.checked)}
          >
            Diffuser la suppression en gare
          </Checkbox>
        </div>
      </div>
    </Modal>
  );
};

export default AddStopModal;
