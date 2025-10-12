import {
  type CreateCirculationSteps,
  CREATE_CIRCULATION_FORM_STEPS,
} from "../../../constants/create-form-steps";
import type {
  ParcoursDto,
  CreateCirculationDto,
} from "../../../types/dto/create-circulation";
import FormActions from "./actions";
import type { StepProps } from "antd";
import React, { useState } from "react";
import type { FormikHelpers } from "formik";
import { useParams } from "react-router-dom";
import CirculationFormStepper from "./stepper";
import FormContentRenderer from "./content-renderer";
import FormikForm from "../../../components/formik/form";
import { createCirculationService } from "../../../services/circulations";
import { useCirculationMapper } from "../../../mappers/create-circulation";
import { CirculationDateType } from "../../../constants/circulation-date-types";
import { CreateCirculationSchema } from "../../../validation/create-circulation.validation";

interface FormContentProps {}

export const defaultStop: ParcoursDto = {
  station: undefined,
  voieTransporteur: undefined,
  monteeInterdite: false,
  descenteInterdite: false,
  inversionComposition: undefined,
  arrivee: {
    horaire: undefined,
    numeroSillon: undefined,
    couplageId: undefined,
  },
  depart: {
    horaire: undefined,
    numeroSillon: undefined,
    couplageId: undefined,
  },
  informationsConjoncturelles: [],
};

const initialValues: CreateCirculationDto = {
  dateType: CirculationDateType.Single,
  parcours: [
    { ...defaultStop, descenteInterdite: true },
    { ...defaultStop, monteeInterdite: true },
  ],
  informationsConjoncturelles: [],
};

const FormContent: React.FC<FormContentProps> = () => {
  const { step } = useParams();
  const { mapCreateCirculationToDto } = useCirculationMapper();

  const [steps, setSteps] = useState<StepProps[]>(
    CREATE_CIRCULATION_FORM_STEPS
  );

  const handleSubmitForm = async (
    data: CreateCirculationDto,
    { setSubmitting }: FormikHelpers<CreateCirculationDto>
  ) => {
    try {
      setSubmitting(true);

      const mappedData = await mapCreateCirculationToDto(data);

      console.log(data);
      console.log(mappedData);
      return;

      const responseData = await createCirculationService(mappedData);

      if (!responseData) throw new Error("No data returned from service");

      console.log(responseData);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormikForm
      withLoadingToast
      onSubmit={handleSubmitForm}
      initialValues={initialValues}
      validationSchema={CreateCirculationSchema}
    >
      {() => {
        return (
          <main className="px-6">
            <CirculationFormStepper steps={steps} setSteps={setSteps} />
            <div className="flex flex-col shadow border border-gray-200  rounded h-[calc(100vh-174px)] bg-white">
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
