import { Button } from "antd";
import { useState } from "react";
import DelayModal from "./delay-modal";
import DeleteStopModal from "./delete-modal";
import type { PointDeParcour } from "@/types/entity/circulation";

interface RouteTabSelectedStopContentProps {
  stop: PointDeParcour;
}

const RouteTabSelectedStopContent: React.FC<
  RouteTabSelectedStopContentProps
> = ({ stop }) => {
  const [showDelayModal, setShowDelayModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isDeleted = stop.statuts.find((s) => s.statut === "supprimé");
  const hasDelay =
    stop?.arret?.arrivee?.retardReel !== 0 ||
    stop?.arret?.depart?.retardReel !== 0;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-2xl">{stop?.desserte?.libelle23}</h2>

        <div className="flex items-center gap-4">
          <Button htmlType="button" onClick={() => setShowDelayModal(true)}>
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

      <DeleteStopModal
        stop={stop}
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />

      <DelayModal
        stop={stop}
        open={showDelayModal}
        onClose={() => setShowDelayModal(false)}
      />
    </div>
  );
};

export default RouteTabSelectedStopContent;
