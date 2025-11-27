import { Field } from "formik";
import TextField from "@/components/formik/textfield";

interface CreateCompositionGeneralInfoProps {}

const CreateCompositionGeneralInfo: React.FC<
  CreateCompositionGeneralInfoProps
> = ({}) => {
  return (
    <div className="border border-gray-200 rounded p-6 bg-white h-full space-y-4">
      <h2 className="font-medium text-lg">Informations Générales</h2>

      <div>
        <Field
          name="code"
          label="Code"
          as={TextField}
          placeholder="Ex: COMPO001"
        />
      </div>
      <div>
        <Field
          label="Nom"
          name="name"
          as={TextField}
          placeholder="Nom de la composition"
        />
      </div>
    </div>
  );
};

export default CreateCompositionGeneralInfo;
