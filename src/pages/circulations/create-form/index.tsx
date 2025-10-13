import FormContent from "./form";
import PageHeader from "@/components/page-header";

interface CreateCirculationFormProps {}

const CreateCirculationForm: React.FC<CreateCirculationFormProps> = ({}) => {
  return (
    <div className="bg-primary-bg">
      <PageHeader title="Créer une circulation" />
      <FormContent />
    </div>
  );
};

export default CreateCirculationForm;
