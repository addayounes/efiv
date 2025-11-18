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

  const isOrigin = index === 0;
  const isDestination = index === values?.parcours?.pointDeParcours?.length;

  const onStopAdd = () => {
    const currentParcours = [...(values.parcours?.pointDeParcours || [])];

    const stopStatus = [{ statut: PointDeParcourStatut.AJOUTE }];

    if (isOrigin)
      stopStatus.push({ statut: PointDeParcourStatut.ARRET_VERS_ORIGINE });

    if (isDestination)
      stopStatus.push({ statut: PointDeParcourStatut.ARRET_VERS_DESTINATION });

    const newStop: PointDeParcour = {
      desserte: {
        codeUIC: station!.id,
        libelle12: station!.libelle12,
        libelle23: station!.libelle23,
      },
      arret: {
        descenteInterdite: isOrigin,
        monteeInterdite: isDestination,
        depart: times.depart
          ? { horaire: times.depart.toISOString() }
          : ({} as any),
        arrivee: times.arrivee
          ? { horaire: times.arrivee.toISOString() }
          : ({} as any),
      },
      rang: index + 1,
      statuts: stopStatus,
      zoneEmbarquement: {},
    };

    currentParcours.splice(index, 0, newStop);

    const updatedParcours = currentParcours.map((stop, idx) => ({
      ...stop,
      rang: idx + 1,
    }));

    setFieldValue(`parcours.pointDeParcours`, updatedParcours);

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
          (!isOrigin && !times.arrivee) ||
          (!isDestination && !times.depart) ||
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
                disabled={isOrigin}
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
                disabled={isDestination}
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
