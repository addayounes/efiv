import {
  type ICirculation,
  type PointDeParcour,
  PointDeParcourStatut,
} from "@/types/entity/circulation";
import { useState } from "react";
import { type Dayjs } from "@/lib/dayjs";
import { DatePicker, Modal } from "antd";
import { useFormikContext } from "formik";
import type { StopDto } from "@/services/ref";
import { StationsFieldWithoutFormik } from "@/pages/circulations/create-form/steps/components/stations-field";

interface AddStopModalProps {
  index: number;
  open: boolean;
  onClose: () => void;
}

interface StopTimes {
  arrivee: Dayjs | undefined;
  depart: Dayjs | undefined;
}

const defaultTimes: StopTimes = { arrivee: undefined, depart: undefined };

const AddStopModal: React.FC<AddStopModalProps> = ({
  open,
  index,
  onClose,
}) => {
  const [station, setStation] = useState<StopDto>();
  const [times, setTimes] = useState<StopTimes>(defaultTimes);
  const { values, setFieldValue } = useFormikContext<ICirculation>();

  const originUic = values?.origine?.codeUIC;
  const destinationUic = values?.destination?.codeUIC;

  const isInsertBeforeOrigin = index === 0;
  const isInsertAfterDestination =
    index === values?.parcours?.pointDeParcours?.length;

  // helper: find first non-deleted stop going forward
  function findNextNonDeleted(
    stops: PointDeParcour[],
    start: number,
    forbidUIC?: string
  ) {
    for (let i = start; i < stops.length; i++) {
      const s = stops[i];
      const isDeleted = s.statuts?.some(
        (st) => st.statut === PointDeParcourStatut.SUPPRIME
      );

      if (!isDeleted && s.desserte?.codeUIC !== forbidUIC) return i;
    }
    return null;
  }

  // helper: find first non-deleted stop going backward
  function findPrevNonDeleted(
    stops: PointDeParcour[],
    start: number,
    forbidUIC?: string
  ) {
    for (let i = start; i >= 0; i--) {
      const s = stops[i];
      const isDeleted = s.statuts?.some(
        (st) => st.statut === PointDeParcourStatut.SUPPRIME
      );

      if (!isDeleted && s.desserte?.codeUIC !== forbidUIC) return i;
    }
    return null;
  }

  const onStopAdd = () => {
    const current = [...(values.parcours?.pointDeParcours || [])];

    // build new stop
    const newStop: PointDeParcour = {
      desserte: {
        codeUIC: station!.id,
        libelle12: station!.libelle12,
        libelle23: station!.libelle23,
      },
      arret: {
        descenteInterdite: isInsertBeforeOrigin,
        monteeInterdite: isInsertAfterDestination,
        depart: times.depart
          ? { horaire: times.depart.toISOString() }
          : ({} as any),
        arrivee: times.arrivee
          ? { horaire: times.arrivee.toISOString() }
          : ({} as any),
      },
      rang: index + 1,
      zoneEmbarquement: {},
      statuts: [{ statut: PointDeParcourStatut.AJOUTE }],
    };

    // insert stop
    current.splice(index, 0, newStop);

    // apply status change to shifted origin/destination
    let targetIndex: number | null = null;

    if (isInsertBeforeOrigin) {
      // origin moved to index 1 → search forward
      targetIndex = findNextNonDeleted(current, index + 1, destinationUic);
    }

    if (isInsertAfterDestination) {
      // destination moved backward → search backward
      targetIndex = findPrevNonDeleted(current, index - 1, originUic);
    }

    const updated = current.map((stop, idx) => {
      let next = { ...stop, rang: idx + 1 };

      // apply status to identified target
      if (targetIndex === idx) {
        const newStatut = isInsertBeforeOrigin
          ? PointDeParcourStatut.ORIGINE_VERS_ARRET
          : PointDeParcourStatut.DESTINATION_VERS_ARRET;

        next = {
          ...next,
          statuts: [{ statut: newStatut }],
        };
      }

      return next;
    });

    setFieldValue(`parcours.pointDeParcours`, updated);
    onClose();
  };

  return (
    <Modal
      open={open}
      okText="Ajouter"
      onOk={onStopAdd}
      onCancel={onClose}
      cancelText="Annuler"
      title="Ajouter une desserte"
      okButtonProps={{
        disabled:
          (!isInsertBeforeOrigin && !times.arrivee) ||
          (!isInsertAfterDestination && !times.depart) ||
          !station,
      }}
    >
      <div className="py-4">
        <div>
          <label
            htmlFor="station-select"
            className="text-sm text-gray-700 font-medium"
          >
            Gare
          </label>
          <StationsFieldWithoutFormik
            id="station-select"
            value={station?.id}
            placeholder="Choisir une gare"
            className="w-full min-w-[350px]"
            onStationChange={(value) => setStation(value)}
          />
        </div>

        <div className="flex gap-4 mt-4">
          <div className="basis-full">
            <label
              htmlFor="station-select"
              className="text-sm text-gray-700 font-medium"
            >
              Arrivée
            </label>
            <div>
              <DatePicker
                showTime
                picker="time"
                format="HH:mm"
                className="w-full"
                needConfirm={false}
                disabled={isInsertBeforeOrigin}
                value={times.arrivee}
                onChange={(date) =>
                  setTimes((prev) => ({ ...prev, arrivee: date }))
                }
                disabledTime={() => {
                  return {
                    disabledHours() {
                      if (times.depart) {
                        return Array.from({ length: 24 }, (_, i) => i).filter(
                          (hour) => hour > times.depart!.hour()
                        );
                      }
                      return [];
                    },
                    disabledMinutes(hour) {
                      if (times.depart && hour === times.depart.hour()) {
                        return Array.from({ length: 60 }, (_, i) => i).filter(
                          (minute) => minute > times.depart!.minute()
                        );
                      }
                      return [];
                    },
                  };
                }}
              />
            </div>
          </div>
          <div className="basis-full">
            <label
              htmlFor="station-select"
              className="text-sm text-gray-700 font-medium"
            >
              Départ
            </label>
            <div>
              <DatePicker
                showTime
                picker="time"
                format="HH:mm"
                className="w-full"
                needConfirm={false}
                value={times.depart}
                disabled={isInsertAfterDestination}
                onChange={(date) =>
                  setTimes((prev) => ({ ...prev, depart: date }))
                }
                disabledTime={() => {
                  return {
                    disabledHours() {
                      if (times.arrivee) {
                        return Array.from({ length: 24 }, (_, i) => i).filter(
                          (hour) => hour < times.arrivee!.hour()
                        );
                      }
                      return [];
                    },
                    disabledMinutes(hour) {
                      if (times.arrivee && hour === times.arrivee.hour()) {
                        return Array.from({ length: 60 }, (_, i) => i).filter(
                          (minute) => minute < times.arrivee!.minute()
                        );
                      }
                      return [];
                    },
                  };
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddStopModal;
