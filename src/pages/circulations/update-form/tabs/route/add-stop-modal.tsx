import {
  type ICirculation,
  type PointDeParcour,
  PointDeParcourStatut,
} from "@/types/entity/circulation";
import { dayjs } from "@/lib/dayjs";
import { DatePicker, Modal } from "antd";
import { useMemo, useState } from "react";
import { useFormikContext } from "formik";
import type { StopDto } from "@/services/ref";
import { getDisabledTimes, type StopTimes } from "@/utils/stop-disabled-time";
import { findNextNonDeleted, findPrevNonDeleted } from "@/utils/parcours.utils";
import { StationsFieldWithoutFormik } from "@/pages/circulations/create-form/steps/components/stations-field";

interface AddStopModalProps {
  index: number;
  open: boolean;
  onClose: () => void;
}

const defaultTimes: StopTimes = { arrivee: undefined, depart: undefined };

function _findNextNonDeleted(
  stops: PointDeParcour[],
  start: number,
  forbidUIC?: string
) {
  return findNextNonDeleted(
    stops.map((s) => ({
      codeUIC: s.desserte?.codeUIC,
      isDeleted: s.statuts?.some(
        (st) => st.statut === PointDeParcourStatut.SUPPRIME
      ),
    })),
    start,
    forbidUIC
  );
}

function _findPrevNonDeleted(
  stops: PointDeParcour[],
  start: number,
  forbidUIC?: string
) {
  return findPrevNonDeleted(
    stops.map((s) => ({
      codeUIC: s.desserte?.codeUIC,
      isDeleted: s.statuts?.some(
        (st) => st.statut === PointDeParcourStatut.SUPPRIME
      ),
    })),
    start,
    forbidUIC
  );
}

const getNextAndPreviousStopTimes = (
  parcours: PointDeParcour[],
  index: number
) => {
  const prevIdx = _findPrevNonDeleted(parcours, index - 1);
  const nextIdx = _findNextNonDeleted(parcours, index);

  const prevStop = prevIdx !== null ? parcours[prevIdx] : null;
  const nextStop = nextIdx !== null ? parcours[nextIdx] : null;

  const prevDeparture = prevStop?.arret?.depart?.horaire
    ? dayjs(prevStop.arret.depart.horaire)
    : null;

  const nextArrival = nextStop?.arret?.arrivee?.horaire
    ? dayjs(nextStop.arret.arrivee.horaire)
    : null;

  return { prevDeparture, nextArrival };
};

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

  const disabledTimes = useMemo(() => {
    const { nextArrival, prevDeparture } = getNextAndPreviousStopTimes(
      values.parcours?.pointDeParcours || [],
      index
    );
    return getDisabledTimes(times, prevDeparture, nextArrival);
  }, [times, values.parcours?.pointDeParcours, index]);

  const isInsertBeforeOrigin = index === 0;
  const isInsertAfterDestination =
    index === values?.parcours?.pointDeParcours?.length;

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
      targetIndex = _findNextNonDeleted(current, index + 1, destinationUic);
    }

    if (isInsertAfterDestination) {
      // destination moved backward → search backward
      targetIndex = _findPrevNonDeleted(current, index - 1, originUic);
    }

    const updated = current.map((stop, idx) => {
      let next = { ...stop, rang: idx + 1 };

      // apply status to identified target
      if (targetIndex === idx) {
        const newStatut = isInsertBeforeOrigin
          ? PointDeParcourStatut.ORIGINE_VERS_ARRET
          : PointDeParcourStatut.DESTINATION_VERS_ARRET;

        // check if it's already the new origin/destination
        if (
          next.statuts.some((s) =>
            [
              PointDeParcourStatut.ARRET_VERS_ORIGINE,
              PointDeParcourStatut.ARRET_VERS_DESTINATION,
            ].includes(s.statut)
          )
        )
          next = {
            ...next,
            statuts: next.statuts.filter(
              (s) =>
                ![
                  PointDeParcourStatut.ARRET_VERS_ORIGINE,
                  PointDeParcourStatut.ARRET_VERS_DESTINATION,
                ].includes(s.statut)
            ),
          };
        else
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
            selectedStations={
              values?.parcours?.pointDeParcours?.map(
                (stop) => stop.desserte.codeUIC
              ) || []
            }
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
                value={times.arrivee}
                disabled={isInsertBeforeOrigin}
                disabledTime={disabledTimes.arrivalDisabledTime}
                onChange={(date) =>
                  setTimes((prev) => ({ ...prev, arrivee: date }))
                }
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
                disabledTime={disabledTimes.departureDisabledTime}
                disabled={
                  isInsertAfterDestination ||
                  (!isInsertBeforeOrigin && !times.arrivee)
                }
                onChange={(date) =>
                  setTimes((prev) => ({ ...prev, depart: date }))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddStopModal;
