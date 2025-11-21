import Select from "@/components/formik/select";
import { Field, useFormikContext } from "formik";
import type { CreateCirculationDto } from "@/types/dto/create-circulation";

interface CouplageTabProps {
  index: number;
}

const CouplageTab: React.FC<CouplageTabProps> = ({ index }) => {
  const { values } = useFormikContext<CreateCirculationDto>();

  const isOriginStop = index === 0;
  const isDestinationStop = index === values.parcours.length - 1;

  return (
    <div className="flex flex-col gap-4">
      <Field
        allowClear
        as={Select}
        options={[]}
        size="medium"
        disabled={isOriginStop}
        className="min-w-[350px]"
        placeholder="Choisir une course"
        label="(Arrivée) Course couplée"
        name={`parcours.${index}.arrivee.couplageId`}
      />
      <Field
        allowClear
        as={Select}
        options={[]}
        size="medium"
        className="min-w-[350px]"
        disabled={isDestinationStop}
        label="(Départ) Course couplée"
        placeholder="Choisir une course"
        name={`parcours.${index}.depart.couplageId`}
      />
    </div>
  );
};

export default CouplageTab;
