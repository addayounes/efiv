import {
  CreateCirculationSteps,
  CREATE_CIRCULATION_FORM_STEPS,
} from "../../../constants/create-form-steps";
import { useState } from "react";
import type { StepProps } from "antd";
import { useParams } from "react-router-dom";
import CirculationFormStepper from "./stepper";
import FormContentRenderer from "./content-renderer";
import PageHeader from "../../../components/page-header";

interface CreateCirculationFormProps {}

const CreateCirculationForm: React.FC<CreateCirculationFormProps> = ({}) => {
  const { step } = useParams();

  const [steps, setSteps] = useState<StepProps[]>(
    CREATE_CIRCULATION_FORM_STEPS
  );
  return (
    <div>
      <PageHeader title="Créer une circulation" />
      <main className="px-6">
        <CirculationFormStepper steps={steps} setSteps={setSteps} />
        <FormContentRenderer step={step as CreateCirculationSteps} />
      </main>
    </div>
  );
};

export default CreateCirculationForm;
