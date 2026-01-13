import {
  type PointDeParcour,
  PointDeParcourStatut,
  type ICirculation,
} from "@/types/entity/circulation";
import toast from "react-hot-toast";
import { useFormikContext } from "formik";
import { Info, Loader } from "lucide-react";
import { useMotifs } from "@/hooks/use-motifs";
import { useEffect, useMemo, useState } from "react";
import { Alert, Checkbox, Input, Modal, Select } from "antd";
import { minutesToDuration, roundToNearest } from "@/utils/date.utils";

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
  const [motif, setMotif] = useState<string>();
  const [searchValue, setSearchValue] = useState("");
  const [delay, setDelay] = useState<DelayState>(defaultDelay);
  const { values, setFieldValue } = useFormikContext<ICirculation>();
  const [applyToFollowingStops, setApplyToFollowingStops] = useState(false);

  const { motifs, loading } = useMotifs(searchValue);

  const motifsOptions = useMemo(
    () =>
      motifs.map((m) => ({
        value: m.id,
        label: m.interne,
        title: m.externe,
      })),
    [motifs]
  );

  const selectedMotif = useMemo(
    () => motifs.find((m) => m.id === Number(motif)),
    [motif, motifs]
  );

  const parcours = values.parcours?.pointDeParcours;

  const isOrigin = index === 0;
  const isDestination = index === (parcours?.length ?? 0) - 1;

  const affectedStops = useMemo(() => {
    if (!applyToFollowingStops) return [stop];
    return [...(parcours?.slice(index) ?? [])].filter((s) => {
      const isDeleted = s.statuts.find(
        (st) => st.statut === PointDeParcourStatut.SUPPRIME
      );
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
    if (delay.arrival == 0 || delay.departure == 0)
      return toast.error("Veuillez renseigner les retards.");

    for (const s of affectedStops) {
      const stopIndex = parcours.findIndex((p) => p.rang === s.rang);
      const fieldPrefix = `parcours.pointDeParcours.${stopIndex}.arret`;

      // if it's not origin
      if (stopIndex !== 0) {
        setFieldValue(`${fieldPrefix}.arrivee.retardReel`, delay.arrival);
        setFieldValue(
          `${fieldPrefix}.arrivee.retardVoyageur`,
          roundToNearest(delay.arrival ?? 0, 5)
        );

        if (selectedMotif) {
          setFieldValue(`${fieldPrefix}.arrivee.motifTransporteurAsync`, {
            code: selectedMotif?.id?.toString(),
            libelle: selectedMotif?.interne,
          });
          setFieldValue(`${fieldPrefix}.arrivee.motifVoyageur`, {
            code: selectedMotif?.id?.toString(),
            libelle: selectedMotif?.externe,
          });
        }
      }

      // if it's not destination
      if (stopIndex !== (parcours?.length ?? 0) - 1) {
        setFieldValue(`${fieldPrefix}.depart.retardReel`, delay.departure);
        setFieldValue(
          `${fieldPrefix}.depart.retardVoyageur`,
          roundToNearest(delay.departure ?? 0, 5)
        );
        if (selectedMotif) {
          setFieldValue(`${fieldPrefix}.depart.motifTransporteurAsync`, {
            code: selectedMotif?.id?.toString(),
            libelle: selectedMotif?.interne,
          });
          setFieldValue(`${fieldPrefix}.depart.motifVoyageur`, {
            code: selectedMotif?.id?.toString(),
            libelle: selectedMotif?.externe,
          });
        }
      }
    }

    onClose();
  };

  useEffect(() => {
    setApplyToFollowingStops(false);
    const motifCode =
      stop.arret.arrivee?.motifTransporteurAsync?.code ??
      stop.arret.depart?.motifTransporteurAsync?.code ??
      stop.arret.arrivee?.motifVoyageur?.code ??
      stop.arret.depart?.motifVoyageur?.code;

    setMotif(motifCode);
    setDelay({
      arrival:
        stop.arret.arrivee?.retardReel ||
        stop.arret.arrivee?.retardVoyageur ||
        0,
      departure:
        stop.arret.depart?.retardReel || stop.arret.depart?.retardVoyageur || 0,
    });
  }, [stop]);

  return (
    <Modal
      open={open}
      onOk={onDelay}
      destroyOnHidden
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

        <div className="flex items-center gap-4">
          {!isOrigin && (
            <div className="flex-1">
              <h4 className="text-sm text-gray-700 font-medium">
                Retard voyageur à l'arrivée
              </h4>
              <p className="text-base text-orange-500">
                <span className="font-medium">
                  +{minutesToDuration(roundToNearest(delay.arrival ?? 0, 5))}
                </span>
              </p>
            </div>
          )}
          {!isDestination && (
            <div className="flex-1">
              <h4 className="text-sm text-gray-700 font-medium">
                Retard voyageur au départ
              </h4>
              <p className="text-base text-orange-500">
                <span className="font-medium">
                  +{minutesToDuration(roundToNearest(delay.departure ?? 0, 5))}
                </span>
              </p>
            </div>
          )}
        </div>

        <hr className="text-gray-200" />

        <div>
          <label
            htmlFor="motif-select"
            className="text-sm text-gray-700 font-medium"
          >
            Motif interne
          </label>
          <div className="my-2">
            <Select
              allowClear
              showSearch
              size="large"
              value={motif}
              loading={loading}
              id="motif-select"
              className="w-full"
              onChange={setMotif}
              filterOption={false}
              autoClearSearchValue
              options={motifsOptions}
              searchValue={searchValue}
              placeholder="Sélectionner un motif"
              onSearch={(value) => setSearchValue(value)}
              notFoundContent={
                loading ? <Loader className="animate-spin" /> : "Aucun résultat"
              }
            />
          </div>
        </div>

        {selectedMotif?.externe && (
          <div>
            <label
              htmlFor="motif-select"
              className="text-sm text-gray-700 font-medium"
            >
              Motif voyageur
            </label>
            <div className="my-2">
              <p className="text-gray-500">{selectedMotif?.externe}</p>
            </div>
          </div>
        )}

        <hr className="text-gray-200" />

        <div>
          <Checkbox
            checked={applyToFollowingStops}
            onChange={(e) => setApplyToFollowingStops(e.target.checked)}
          >
            Appliquer aux dessertes qui suivent{" "}
            <span className="font-medium">{stop?.desserte?.libelle23}</span>
          </Checkbox>
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
      </div>
    </Modal>
  );
};

export default DelayModal;
