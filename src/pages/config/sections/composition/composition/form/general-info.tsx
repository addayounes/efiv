import { Field } from "formik";
import TextField from "@/components/formik/textfield";

interface CreateCompositionGeneralInfoProps {}

const CreateCompositionGeneralInfo: React.FC<
  CreateCompositionGeneralInfoProps
> = ({}) => {
  return (
    <div className="border border-gray-200 rounded p-4 bg-white h-full space-y-4">
      <h2 className="font-medium text-lg">Informations Générales</h2>

      <div className="max-w-[50%]">
        <Field
          name="name"
          as={TextField}
          label="Libellé"
          placeholder="Libellé de la composition"
        />
      </div>
    </div>
  );
};

export default CreateCompositionGeneralInfo;
