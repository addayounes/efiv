import FormContent from "./form";
import PageHeader from "../../../components/page-header";

interface CreateCirculationFormProps {}

const CreateCirculationForm: React.FC<CreateCirculationFormProps> = ({}) => {
  return (
    <div>
      <PageHeader title="Créer une circulation" />
      <FormContent />
    </div>
  );
};

export default CreateCirculationForm;
