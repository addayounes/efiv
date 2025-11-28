import { Field } from "formik";
import type { SelectedState } from ".";
import TextField from "@/components/formik/textfield";

interface TrainControlProps {
  selected: SelectedState;
}

const TrainControl: React.FC<TrainControlProps> = ({ selected }) => {
  return (
    <div className="grid gap-4 grid-cols-2">
      <Field
        disabled
        label="Rang"
        as={TextField}
        value={selected.train + 1}
        name={`materielRoulant.${selected.train}.rang`}
      />
      <Field
        label="Série"
        as={TextField}
        placeholder="Série"
        name={`materielRoulant.${selected.train}.serie`}
      />
      <Field
        as={TextField}
        label="Sous-Série"
        placeholder="Sous-Série"
        name={`materielRoulant.${selected.train}.sousSerie`}
      />
      <Field
        as={TextField}
        label="Sous-Série 2"
        placeholder="Sous-Série 2"
        name={`materielRoulant.${selected.train}.sousSerie2`}
      />
    </div>
  );
};

export default TrainControl;
