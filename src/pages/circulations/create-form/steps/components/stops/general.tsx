import type {
  ParcoursDto,
  CreateCirculationDto,
} from "@/types/dto/create-circulation";
import { useMemo } from "react";
import { dayjs } from "@/lib/dayjs";
import Switch from "@/components/formik/switch";
import { Field, useFormikContext } from "formik";
import TextField from "@/components/formik/textfield";
import DateTimePicker from "@/components/formik/date-time";
import { getDisabledTimes } from "@/utils/stop-disabled-time";
import { findNextNonDeleted, findPrevNonDeleted } from "@/utils/parcours.utils";

interface StepsGeneralTabProps {
  index: number;
}

function _findNextNonDeleted(stops: ParcoursDto[], start: number) {
  console.log(
    stops.map((s) => ({
      codeUIC: s.station?.value!,
      isDeleted: false,
    }))
  );
  return findNextNonDeleted(
    stops.map((s) => ({
      codeUIC: s.station?.value!,
      isDeleted: false,
    })),
    start
  );
}

function _findPrevNonDeleted(stops: ParcoursDto[], start: number) {
  return findPrevNonDeleted(
    stops.map((s) => ({
      codeUIC: s.station?.value!,
      isDeleted: false,
    })),
    start
  );
}

const getNextAndPreviousStopTimes = (
  parcours: ParcoursDto[],
  index: number
) => {
  const prevIdx = _findPrevNonDeleted(parcours, index - 1);

  const nextIdx = _findNextNonDeleted(parcours, index + 1);

  const prevStop = prevIdx !== null ? parcours[prevIdx] : null;
  const nextStop = nextIdx !== null ? parcours[nextIdx] : null;

  const prevDeparture = prevStop?.depart?.horaire
    ? dayjs(prevStop.depart.horaire)
    : null;

  const nextArrival = nextStop?.arrivee?.horaire
    ? dayjs(nextStop.arrivee.horaire)
    : null;

  return { prevDeparture, nextArrival };
};

const StepsGeneralTab: React.FC<StepsGeneralTabProps> = ({ index }) => {
  const { values } = useFormikContext<CreateCirculationDto>();

  const currentStop = values.parcours?.[index];

  const disabledTimes = useMemo(() => {
    const { nextArrival, prevDeparture } = getNextAndPreviousStopTimes(
      values.parcours || [],
      index
    );
    return getDisabledTimes(
      {
        arrivee: currentStop?.arrivee?.horaire
          ? dayjs(currentStop.arrivee.horaire)
          : undefined,
        depart: currentStop?.depart?.horaire
          ? dayjs(currentStop.depart.horaire)
          : undefined,
      },
      prevDeparture,
      nextArrival
    );
  }, [
    index,
    values.parcours,
    currentStop?.arrivee?.horaire,
    currentStop?.depart?.horaire,
    currentStop?.station?.value,
  ]);

  return (
    <div className="space-y-4">
      <div className="flex">
        <div className="flex-1/2 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Field
              picker="time"
              size="medium"
              format="HH:mm"
              label="Arrivée"
              className="w-56"
              as={DateTimePicker}
              disabled={index === 0}
              name={`parcours.${index}.arrivee.horaire`}
              disabledTime={disabledTimes.arrivalDisabledTime}
            />
            <div className="w-56">
              <Field
                size="medium"
                label="Sillon"
                as={TextField}
                placeholder="155898"
                name={`parcours.${index}.arrivee.numeroSillon`}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Field
              picker="time"
              size="medium"
              format="HH:mm"
              label="Départ"
              className="w-56"
              as={DateTimePicker}
              name={`parcours.${index}.depart.horaire`}
              disabled={index === values.parcours?.length - 1}
              disabledTime={disabledTimes.departureDisabledTime}
            />
            <div className="w-56">
              <Field
                size="medium"
                label="Sillon"
                as={TextField}
                placeholder="155898"
                name={`parcours.${index}.depart.numeroSillon`}
              />
            </div>
          </div>
        </div>

        <div className="flex-1/2 flex flex-col gap-4 border-l border-gray-200 pl-4">
          <div className="w-56">
            <Field
              size="medium"
              label="Voie"
              as={TextField}
              placeholder="3"
              name={`parcours.${index}.voieTransporteur`}
            />
          </div>
          <div className="flex items-center gap-8">
            <Field
              as={Switch}
              label="Montée interdite"
              name={`parcours.${index}.monteeInterdite`}
              disabled={index === values.parcours?.length - 1}
            />
            <Field
              as={Switch}
              disabled={index === 0}
              label="Descente interdite"
              name={`parcours.${index}.descenteInterdite`}
            />
            <Field
              as={Switch}
              label="Inversion de composition"
              name={`parcours.${index}.inversionComposition`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsGeneralTab;
