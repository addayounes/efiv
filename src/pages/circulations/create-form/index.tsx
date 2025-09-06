import { useState } from "react";
import type { StepProps } from "antd";
import CirculationFormStepper from "./stepper";
import { CREATE_CIRCULATION_FORM_STEPS } from "../../../constants/create-form-steps";
import PageHeader from "../../../components/page-header";

interface CreateCirculationFormProps {}

const CreateCirculationForm: React.FC<CreateCirculationFormProps> = ({}) => {
  const [steps, setSteps] = useState<StepProps[]>(
    CREATE_CIRCULATION_FORM_STEPS
  );
  return (
    <div>
      <PageHeader title="Créer une circulation" />
      <main className="px-6">
        <CirculationFormStepper steps={steps} setSteps={setSteps} />
      </main>
    </div>
  );
};

export default CreateCirculationForm;
