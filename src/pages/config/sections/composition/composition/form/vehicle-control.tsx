import { Field } from "formik";
import type { SelectedState } from ".";
import TextField from "@/components/formik/textfield";

interface VehicleControlProps {
  selected: SelectedState;
}

const VehicleControl: React.FC<VehicleControlProps> = ({ selected }) => {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex-1">
          <h4 className="text-sm text-gray-700 font-medium">Rang</h4>
          <p className="text-base">
            <span className="font-medium">{selected.car + 1}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Field
          disabled
          label="Type"
          as={TextField}
          placeholder="Type"
          name={`materielRoulant.${selected.train}.elementMaterielRoulantAsync.${selected.car}.type`}
        />
        <Field
          label="Libellé"
          as={TextField}
          placeholder="Libellé"
          name={`materielRoulant.${selected.train}.elementMaterielRoulantAsync.${selected.car}.libelle`}
        />
        <Field
          min={0}
          suffix="cm"
          type="number"
          as={TextField}
          label="Longueur"
          placeholder="Longueur"
          name={`materielRoulant.${selected.train}.elementMaterielRoulantAsync.${selected.car}.longueur`}
        />
      </div>
    </div>
  );
};

export default VehicleControl;
