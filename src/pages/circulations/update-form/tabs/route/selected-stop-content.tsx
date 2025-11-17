import {
  type PointDeParcour,
  PointDeParcourStatut,
} from "@/types/entity/circulation";
import { Button, Tabs } from "antd";
import { useState } from "react";
import DelayModal from "./delay-modal";
import DeleteStopModal from "./delete-modal";
import DeletedStopBadge from "@/components/deleted-stop-badge";
import UpdateContentGeneralTab from "./content-tabs/general";

interface RouteTabSelectedStopContentProps {
  index: number;
  stop: PointDeParcour;
}

const RouteTabSelectedStopContent: React.FC<
  RouteTabSelectedStopContentProps
> = ({ index, stop }) => {
  const [showDelayModal, setShowDelayModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isDeleted = stop.statuts.find(
    (s) => s.statut === PointDeParcourStatut.SUPPRIME
  );

  const hasDelay =
    stop?.arret?.arrivee?.retardReel !== 0 ||
    stop?.arret?.depart?.retardReel !== 0;

  const isDeletedDiffusable =
    (stop.arret?.arrivee?.suppressionDiffusable ||
      stop.arret?.depart?.suppressionDiffusable) &&
    isDeleted;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-4 font-medium text-2xl">
          {stop?.desserte?.libelle23}

          {isDeleted && (
            <DeletedStopBadge isDiffusable={!!isDeletedDiffusable} />
          )}
        </h2>

        <div className="flex items-center gap-4">
          <Button
            htmlType="button"
            disabled={!!isDeleted}
            onClick={() => setShowDelayModal(true)}
          >
            {hasDelay ? "Modifier le retard" : "Annoncer un retard"}
          </Button>
          <Button
            danger
            type="primary"
            htmlType="button"
            disabled={!!isDeleted}
            onClick={() => setShowDeleteModal(true)}
          >
            Supprimer la desserte
          </Button>
        </div>
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
          ></Tabs.TabPane>
          <Tabs.TabPane
            key="info-conj"
            tab={<p className="text-sm font-medium">Info Conjoncturelles</p>}
          ></Tabs.TabPane>
          <Tabs.TabPane
            key="couplage"
            tab={<p className="text-sm font-medium">Couplage</p>}
          ></Tabs.TabPane>
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
