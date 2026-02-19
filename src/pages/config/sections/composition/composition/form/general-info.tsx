import { Field } from "formik";
import Select from "@/components/formik/select";
import TextField from "@/components/formik/textfield";
import { CIRCULATION_MODE_OPTIONS } from "@/constants/mode-sub-mode";

interface CreateCompositionGeneralInfoProps {}

const CreateCompositionGeneralInfo: React.FC<
  CreateCompositionGeneralInfoProps
> = ({}) => {
  return (
    <div className="border border-gray-200 rounded p-4 bg-white h-full space-y-4">
      <h2 className="font-medium text-lg">Informations Générales</h2>

      <div className="flex items-center gap-4">
        <Field
          name="code"
          label="Code"
          as={TextField}
          placeholder="Code de la composition"
        />
        <Field
          name="name"
          as={TextField}
          label="Libellé"
          placeholder="Libellé de la composition"
        />
        <Field
          name="mode"
          label="Mode"
          as={Select}
          className="w-full"
          options={CIRCULATION_MODE_OPTIONS}
          placeholder="Mode de la composition"
        />
      </div>
    </div>
  );
};

export default CreateCompositionGeneralInfo;
