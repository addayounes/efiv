import {
  CREATE_CIRCULATION_FORM_STEPS,
  type CreateCirculationSteps,
} from "../../../constants/create-form-steps";
import FormActions from "./actions";
import type { StepProps } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CirculationFormStepper from "./stepper";
import FormContentRenderer from "./content-renderer";
import FormikForm from "../../../components/formik/form";
import type { CreateCirculationDto } from "../../../types/dto/create-circulation";

interface FormContentProps {}

const initialValues: CreateCirculationDto = {};

const FormContent: React.FC<FormContentProps> = () => {
  const { step } = useParams();

  const [steps, setSteps] = useState<StepProps[]>(
    CREATE_CIRCULATION_FORM_STEPS
  );

  const handleSubmitForm = () => {
    // Handle form submission logic here
  };

  return (
    <FormikForm
      withLoadingToast
      onSubmit={handleSubmitForm}
      initialValues={initialValues}
    >
      {() => {
        return (
          <main className="px-6">
            <CirculationFormStepper steps={steps} setSteps={setSteps} />
            <div className="flex flex-col border border-gray-200 rounded h-[calc(100vh-174px)]">
              <div className="flex-1 overflow-y-auto">
                <FormContentRenderer step={step as CreateCirculationSteps} />
              </div>
              <div className="justify-end border-t border-gray-200 p-4">
                <FormActions />
              </div>
            </div>
          </main>
        );
      }}
    </FormikForm>
  );
};

export default FormContent;
