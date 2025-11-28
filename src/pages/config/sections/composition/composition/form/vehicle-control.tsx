import { Field } from "formik";
import type { SelectedState } from ".";
import TextField from "@/components/formik/textfield";

interface VehicleControlProps {
  selected: SelectedState;
}

const VehicleControl: React.FC<VehicleControlProps> = ({ selected }) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 grid-cols-2">
        <Field
          disabled
          label="Rang"
          as={TextField}
          value={selected.car + 1}
          name={`materielRoulant.${selected.train}.elementMaterielRoulant.${selected.car}.rang`}
        />
        <Field
          disabled
          label="Type"
          as={TextField}
          placeholder="Type"
          name={`materielRoulant.${selected.train}.elementMaterielRoulant.${selected.car}.type`}
        />
        <Field
          label="Libellé"
          as={TextField}
          placeholder="Libellé"
          name={`materielRoulant.${selected.train}.elementMaterielRoulant.${selected.car}.libelle`}
        />
        <Field
          min={0}
          suffix="cm"
          type="number"
          as={TextField}
          label="Longueur"
          placeholder="Longueur"
          name={`materielRoulant.${selected.train}.elementMaterielRoulant.${selected.car}.longueur`}
        />
      </div>
    </div>
  );
};

export default VehicleControl;
