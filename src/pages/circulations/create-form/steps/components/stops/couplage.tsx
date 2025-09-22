import { Field } from "formik";
import Select from "../../../../../../components/formik/select";

interface CouplageTabProps {
  index: number;
}

const CouplageTab: React.FC<CouplageTabProps> = ({ index }) => {
  return (
    <div className="flex flex-col gap-4">
      <Field
        allowClear
        as={Select}
        size="medium"
        className="min-w-[350px]"
        name={`parcours.${index}.arrivee.couplageId`}
        placeholder="Choisir une course"
        label="(Arrivée) Course couplée"
        options={[]}
      />
      <Field
        allowClear
        as={Select}
        size="medium"
        className="min-w-[350px]"
        name={`parcours.${index}.depart.couplageId`}
        placeholder="Choisir une course"
        label="(Départ) Course couplée"
        options={[]}
      />
    </div>
  );
};

export default CouplageTab;
