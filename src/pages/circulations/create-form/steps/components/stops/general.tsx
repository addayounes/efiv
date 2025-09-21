import { Field, useFormikContext } from "formik";
import Switch from "../../../../../../components/formik/switch";
import TextField from "../../../../../../components/formik/textfield";
import DateTimePicker from "../../../../../../components/formik/date-time";
import type { CreateCirculationDto } from "../../../../../../types/dto/create-circulation";

interface StepsGeneralTabProps {
  index: number;
}

const StepsGeneralTab: React.FC<StepsGeneralTabProps> = ({ index }) => {
  const { values } = useFormikContext<CreateCirculationDto>();

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
              {...(index === values.parcours?.length - 1
                ? { value: true }
                : {})}
            />
            <Field
              as={Switch}
              disabled={index === 0}
              label="Descente interdite"
              {...(index === 0 ? { value: true } : {})}
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
