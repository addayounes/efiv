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
    // Soft delete the stop
    await setFieldValue(`parcours.pointDeParcours.${index}.statuts`, [
      {
        statut: PointDeParcourStatut.SUPPRIME,
        motifTransporteur: {
          code: motif,
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

  // --- helpers ---
  function isDeleted(stop: PointDeParcour) {
    return stop.statuts?.some(
      (s) => s.statut === PointDeParcourStatut.SUPPRIME
    );
  }

  // find first non-deleted stop after index, skipping destination if needed
  function findNextNonDeleted(
    stops: PointDeParcour[],
    startIndex: number,
    forbidUIC?: string
  ) {
    for (let i = startIndex; i < stops.length; i++) {
      const s = stops[i];
      if (!isDeleted(s) && s.desserte?.codeUIC !== forbidUIC) return i;
    }
    return null;
  }

  // find first non-deleted stop before index, skipping origin if needed
  function findPrevNonDeleted(
    stops: PointDeParcour[],
    startIndex: number,
    forbidUIC?: string
  ) {
    for (let i = startIndex; i >= 0; i--) {
      const s = stops[i];
      if (!isDeleted(s) && s.desserte?.codeUIC !== forbidUIC) return i;
    }
    return null;
  }

  const handlePostDelete = () => {
    const parcours = [...(values.parcours?.pointDeParcours || [])];
    const originUIC = values?.origine?.codeUIC;
    const destinationUIC = values?.destination?.codeUIC;

    // ----------------------------------------------------
    // 1️⃣ DELETE ORIGIN CASE
    // ----------------------------------------------------
    if (isOrigin) {
      const targetIdx = findNextNonDeleted(
        parcours,
        index + 1,
        destinationUIC // cannot be destination
      );

      if (targetIdx !== null) {
        const targetStop = parcours[targetIdx];

        // update status
        const newStatuts = [
          { statut: PointDeParcourStatut.ARRET_VERS_ORIGINE },
        ];

        setFieldValue(
          `parcours.pointDeParcours.${targetIdx}.statuts`,
          newStatuts
        );

        // update origin fields
        setFieldValue(`origine`, {
          codeUIC: targetStop.desserte.codeUIC,
          libelle12: targetStop.desserte.libelle12,
          libelle23: targetStop.desserte.libelle23,
        });

        setFieldValue(`origineInitiale`, originUIC);
      }
    }

    // ----------------------------------------------------
    // 2️⃣ DELETE DESTINATION CASE
    // ----------------------------------------------------
    if (isDestination) {
      const targetIdx = findPrevNonDeleted(
        parcours,
        index - 1,
        originUIC // cannot be origin
      );

      if (targetIdx !== null) {
        const targetStop = parcours[targetIdx];

        // update status
        const newStatuts = [
          { statut: PointDeParcourStatut.ARRET_VERS_DESTINATION },
        ];

        setFieldValue(
          `parcours.pointDeParcours.${targetIdx}.statuts`,
          newStatuts
        );

        // update destination fields
        setFieldValue(`destination`, {
          codeUIC: targetStop.desserte.codeUIC,
          libelle12: targetStop.desserte.libelle12,
          libelle23: targetStop.desserte.libelle23,
        });

        setFieldValue(`destinationInitiale`, destinationUIC);
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
