import type {
  PointDeParcour,
  ICirculationCourse,
} from "@/types/entity/circulation";
import { Info } from "lucide-react";
import { useFormikContext } from "formik";
import { Alert, Checkbox, Input, Modal } from "antd";
import { useEffect, useMemo, useState } from "react";

interface DelayModalProps {
  index: number;
  open: boolean;
  onClose: () => void;
  stop: PointDeParcour;
}

interface DelayState {
  arrival: number;
  departure: number;
}

const defaultDelay: DelayState = {
  arrival: 0,
  departure: 0,
};

const DelayModal: React.FC<DelayModalProps> = ({
  open,
  stop,
  index,
  onClose,
}) => {
  const [delay, setDelay] = useState<DelayState>(defaultDelay);
  const { values, setFieldValue } = useFormikContext<ICirculationCourse>();
  const [applyToFollowingStops, setApplyToFollowingStops] = useState(false);

  const parcours = values.parcours?.pointDeParcours;

  const isOrigin = index === 0;
  const isDestination = index === (parcours?.length ?? 0) - 1;

  const affectedStops = useMemo(() => {
    if (!applyToFollowingStops) return [stop];
    return [...(parcours?.slice(index) ?? [])].filter((s) => {
      const isDeleted = s.statuts.find((st) => st.statut === "supprimé");
      return !isDeleted;
    });
  }, [applyToFollowingStops, index, parcours]);

  const getAlertMessage = () => {
    if (applyToFollowingStops) {
      return `Ces retards seront appliqués sur ${affectedStops.length} ${
        affectedStops.length === 1 ? "desserte" : "dessertes"
      }.`;
    }
    return "Ce retard sera appliqué uniquement sur cette desserte.";
  };

  const onDelay = () => {
    for (const s of affectedStops) {
      const stopIndex = parcours.findIndex((p) => p.rang === s.rang);
      const fieldPrefix = `parcours.pointDeParcours.${stopIndex}.arret`;
      if (!isOrigin)
        setFieldValue(`${fieldPrefix}.arrivee.retardReel`, delay.arrival);

      if (!isDestination)
        setFieldValue(`${fieldPrefix}.depart.retardReel`, delay.departure);
    }

    onClose();
  };

  useEffect(() => {
    setApplyToFollowingStops(false);
    setDelay({
      arrival: stop.arret.arrivee?.retardReel || 0,
      departure: stop.arret.depart?.retardReel || 0,
    });
  }, [stop]);

  return (
    <Modal
      open={open}
      onOk={onDelay}
      onCancel={onClose}
      okText="Confirmer"
      cancelText="Annuler"
      title="Annoncer un retard"
    >
      <div className="py-6 space-y-4">
        <div className="flex gap-4">
          {!isOrigin && (
            <div className="flex-1">
              <label
                htmlFor="delay-input-arrival"
                className="text-sm text-gray-700 font-medium"
              >
                Retard à l'arrivée
              </label>
              <Input
                min={0}
                size="large"
                type="number"
                suffix="minutes"
                value={delay.arrival}
                id="delay-input-arrival"
                placeholder="le retard à l'arrivée"
                onChange={(e) =>
                  setDelay((prev) => ({
                    ...prev,
                    arrival: e.target.valueAsNumber,
                  }))
                }
              />
            </div>
          )}
          {!isDestination && (
            <div className="flex-1">
              <label
                htmlFor="delay-input-departure"
                className="text-sm text-gray-700 font-medium"
              >
                Retard au départ
              </label>
              <Input
                min={0}
                size="large"
                type="number"
                suffix="minutes"
                value={delay.departure}
                id="delay-input-departure"
                placeholder="le retard au départ"
                onChange={(e) =>
                  setDelay((prev) => ({
                    ...prev,
                    departure: e.target.valueAsNumber,
                  }))
                }
              />
            </div>
          )}
        </div>

        <div>
          <Alert
            showIcon
            type="warning"
            style={{ padding: 10 }}
            icon={<Info size={20} />}
            description={<p className="text-sm">{getAlertMessage()}</p>}
          />
        </div>

        <Checkbox
          checked={applyToFollowingStops}
          onChange={(e) => setApplyToFollowingStops(e.target.checked)}
        >
          Appliquer aux dessertes qui suivent{" "}
          <span className="font-medium">{stop?.desserte?.libelle23}</span>
        </Checkbox>
      </div>
    </Modal>
  );
};

export default DelayModal;
