import Switch from "@/components/formik/switch";
import { Field, useFormikContext } from "formik";
import { minutesToDuration } from "@/utils/date.utils";
import type { ICirculationCourse } from "@/types/entity/circulation";

interface UpdateContentGeneralTabProps {
  index: number;
}

const UpdateContentGeneralTab: React.FC<UpdateContentGeneralTabProps> = ({
  index,
}) => {
  const { values } = useFormikContext<ICirculationCourse>();
  return (
    <div className="p-0 space-y-6">
      <div className="flex gap-4">
        <div className="w-68">
          <h4 className="text-sm text-gray-700 font-medium">
            Retard à l'arrivée
          </h4>
          <p className="text-base text-orange-500">
            <span className="font-medium">
              +
              {minutesToDuration(
                values?.parcours?.pointDeParcours?.[index]?.arret?.arrivee
                  ?.retardReel ?? 0
              )}
            </span>
          </p>
        </div>
        <div className="w-68">
          <h4 className="text-sm text-gray-700 font-medium">
            Retard au départ
          </h4>
          <p className="text-base text-orange-500">
            <span className="font-medium">
              +
              {minutesToDuration(
                values?.parcours?.pointDeParcours?.[index]?.arret?.depart
                  ?.retardReel ?? 0
              )}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <Field
          as={Switch}
          label="Montée interdite"
          name={`parcours.pointDeParcours.${index}.arret.monteeInterdite`}
          disabled={index === values.parcours?.pointDeParcours?.length - 1}
        />
        <Field
          as={Switch}
          disabled={index === 0}
          label="Descente interdite"
          name={`parcours.pointDeParcours.${index}.arret.descenteInterdite`}
        />
        <Field
          as={Switch}
          label="Inversion de composition"
          name={`parcours.pointDeParcours.${index}.arret.inversionComposition`}
        />
      </div>
    </div>
  );
};

export default UpdateContentGeneralTab;
