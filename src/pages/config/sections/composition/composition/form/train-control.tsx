import { Field } from "formik";
import type { SelectedState } from ".";
import TextField from "@/components/formik/textfield";

interface TrainControlProps {
  selected: SelectedState;
}

const TrainControl: React.FC<TrainControlProps> = ({ selected }) => {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex-1">
          <h4 className="text-sm text-gray-700 font-medium">Rang</h4>
          <p className="text-base">
            <span className="font-medium">{selected.train + 1}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
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
    </div>
  );
};

export default TrainControl;
