import {
  type ICirculation,
  type PointDeParcour,
  PointDeParcourStatut,
} from "@/types/entity/circulation";
import { useState } from "react";
import { Button, Tabs } from "antd";
import DelayModal from "./delay-modal";
import { useFormikContext } from "formik";
import DeleteStopModal from "./delete-modal";
import UpdateContentGeneralTab from "./content-tabs/general";
import DeletedStopBadge from "@/components/deleted-stop-badge";
import UpdateInfoConjoncturelle from "./content-tabs/info-conj";
import { CirculationStatus } from "@/constants/circulation-status";
import UpdateContentCompositionTab from "./content-tabs/composition";

interface RouteTabSelectedStopContentProps {
  index: number;
  stop: PointDeParcour;
}

const RouteTabSelectedStopContent: React.FC<
  RouteTabSelectedStopContentProps
> = ({ index, stop }) => {
  const { values, setFieldValue } = useFormikContext<ICirculation>();

  const [showDelayModal, setShowDelayModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isTrainDeleted = values?.statut === CirculationStatus.Supprime;

  const isDeleted = stop.statuts.find(
    (s) => s.statut === PointDeParcourStatut.SUPPRIME
  );

  const isDeletedDiffusable =
    (stop.arret?.arrivee?.suppressionDiffusable ||
      stop.arret?.depart?.suppressionDiffusable) &&
    isDeleted;

  const cancelDeletion = () => {
    const updatedStatuts = stop.statuts.filter(
      (s) => s.statut !== PointDeParcourStatut.SUPPRIME
    );
    setFieldValue(`parcours.pointDeParcours.${index}.statuts`, updatedStatuts);
  };

  const onClickDelete = () => {
    if (isDeleted) return cancelDeletion();
    setShowDeleteModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-4 font-medium text-2xl">
          {stop?.desserte?.libelle23}

          {isDeleted && (
            <DeletedStopBadge isDiffusable={!!isDeletedDiffusable} />
          )}
        </h2>

        {!isTrainDeleted && (
          <div className="flex items-center gap-4">
            <Button
              htmlType="button"
              disabled={!!isDeleted}
              onClick={() => setShowDelayModal(true)}
            >
              Annoncer un retard
            </Button>
            <Button
              type="primary"
              htmlType="button"
              danger={!isDeleted}
              onClick={onClickDelete}
            >
              {isDeleted ? "Annuler la suppression" : "Supprimer la desserte"}
            </Button>
          </div>
        )}
      </div>

      <div className="mt-4">
        <Tabs size="small" type="card">
          <Tabs.TabPane
            key="general"
            tab={<p className="text-sm font-medium">Général</p>}
          >
            <UpdateContentGeneralTab index={index} />
          </Tabs.TabPane>
          <Tabs.TabPane
            key="composition"
            tab={<p className="text-sm font-medium">Composition</p>}
          >
            <UpdateContentCompositionTab index={index} />
          </Tabs.TabPane>
          <Tabs.TabPane
            key="info-conj"
            tab={<p className="text-sm font-medium">Info Conjoncturelles</p>}
          >
            <UpdateInfoConjoncturelle index={index} />
          </Tabs.TabPane>
        </Tabs>
      </div>

      <DeleteStopModal
        index={index}
        stop={stop}
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />

      <DelayModal
        index={index}
        stop={stop}
        open={showDelayModal}
        onClose={() => setShowDelayModal(false)}
      />
    </div>
  );
};

export default RouteTabSelectedStopContent;
