import {
  type PointDeParcour,
  PointDeParcourStatut,
  type ICirculation,
} from "@/types/entity/circulation";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { Checkbox, Modal, Select } from "antd";

interface DeleteStopModalProps {
  index: number;
  open: boolean;
  onClose: () => void;
  stop: PointDeParcour;
}

const motifs = [
  {
    value: "La desserte ne doit plus être effectuée",
    label: "La desserte ne doit plus être effectuée",
  },
  {
    value: "La desserte est temporairement supprimée",
    label: "La desserte est temporairement supprimée",
  },
];

const DeleteStopModal: React.FC<DeleteStopModalProps> = ({
  open,
  stop,
  index,
  onClose,
}) => {
  const [motif, setMotif] = useState<string>();
  const [isStreamable, setIsStreamable] = useState(false);
  const { values, setFieldValue } = useFormikContext<ICirculation>();

  const isOrigin = index === 0;
  const isDestination = index === values?.parcours?.pointDeParcours?.length - 1;

  const onStopDelete = async () => {
    await setFieldValue(`parcours.pointDeParcours.${index}.statuts`, [
      {
        statut: PointDeParcourStatut.SUPPRIME,
        motifTransporteur: {
          id: motif,
          libelle: motif,
        },
      },
    ]);
    await setFieldValue(
      `parcours.pointDeParcours.${index}.arret.arrivee.suppressionDiffusable`,
      isStreamable
    );
    await setFieldValue(
      `parcours.pointDeParcours.${index}.arret.depart.suppressionDiffusable`,
      isStreamable
    );

    handlePostDelete();

    onClose();
  };

  const handlePostDelete = () => {
    const currentParcours = [...(values.parcours?.pointDeParcours || [])];

    if (isOrigin) {
      const nextStop = currentParcours[index + 1];
      if (nextStop) {
        const updatedStatuts = (nextStop.statuts ?? []).filter(
          (s) => s.statut !== PointDeParcourStatut.ARRET_VERS_ORIGINE
        );
        updatedStatuts.push({
          statut: PointDeParcourStatut.ARRET_VERS_ORIGINE,
        });
        setFieldValue(
          `parcours.pointDeParcours.${index + 1}.statuts`,
          updatedStatuts
        );
        setFieldValue(`origine`, {
          codeUIC: nextStop?.desserte?.codeUIC,
          libelle12: nextStop?.desserte?.libelle12,
          libelle23: nextStop?.desserte?.libelle23,
        });
        setFieldValue(`origineInitiale`, stop?.desserte?.codeUIC);
      }
    }

    if (isDestination) {
      const prevStop = currentParcours[index - 1];
      if (prevStop) {
        const updatedStatuts = (prevStop.statuts ?? []).filter(
          (s) => s.statut !== PointDeParcourStatut.ARRET_VERS_DESTINATION
        );
        updatedStatuts.push({
          statut: PointDeParcourStatut.ARRET_VERS_DESTINATION,
        });
        setFieldValue(
          `parcours.pointDeParcours.${index - 1}.statuts`,
          updatedStatuts
        );
        setFieldValue(`destination`, {
          codeUIC: prevStop?.desserte?.codeUIC,
          libelle12: prevStop?.desserte?.libelle12,
          libelle23: prevStop?.desserte?.libelle23,
        });
        setFieldValue(`destinationInitiale`, stop?.desserte?.codeUIC);
      }
    }
  };

  useEffect(() => {
    setMotif(undefined);
    setIsStreamable(false);
  }, [stop]);

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

export default DeleteStopModal;
