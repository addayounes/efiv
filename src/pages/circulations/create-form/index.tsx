import FormContent from "./form";
import { __routes__ } from "@/constants/routes";
import PageHeader from "@/components/page-header";

interface CreateCirculationFormProps {}

const CreateCirculationForm: React.FC<CreateCirculationFormProps> = ({}) => {
  return (
    <div className="bg-primary-bg">
      <PageHeader
        title="Créer une circulation"
        backTo={__routes__.Circulations.Main}
      />
      <FormContent />
    </div>
  );
};

export default CreateCirculationForm;
