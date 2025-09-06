import {
  CreateCirculationSteps,
  CREATE_CIRCULATION_FORM_STEPS,
} from "../../../constants/create-form-steps";
import { useState } from "react";
import FormActions from "./actions";
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
        <div className="flex flex-col border border-gray-200 rounded h-[calc(100vh-174px)] overflow-y-auto">
          <div className="p-4 flex-1">
            <FormContentRenderer step={step as CreateCirculationSteps} />
          </div>
          <div className="justify-end border-t border-gray-200 mt-4 p-4">
            <FormActions />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateCirculationForm;
