import {
  type CreateCirculationSteps,
  CREATE_CIRCULATION_FORM_STEPS,
} from "@/constants/create-form-steps";
import type {
  ParcoursDto,
  CreateCirculationDto,
} from "@/types/dto/create-circulation";
import {
  DateFrequency,
  CirculationDateType,
} from "@/constants/circulation-date-types";
import FormActions from "./actions";
import toast from "react-hot-toast";
import React, { useMemo } from "react";
import CirculationFormStepper from "./stepper";
import { __routes__ } from "@/constants/routes";
import FormikForm from "@/components/formik/form";
import FormContentRenderer from "./content-renderer";
import type { ICirculation } from "@/types/entity/circulation";
import { createCirculationService } from "@/services/circulations";
import { useCirculationMapper } from "@/mappers/create-circulation";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CreateCirculationSchema } from "@/validation/create-circulation.validation";
import { mapCirculationToCreateCirculationDto } from "@/mappers/circulation-to-create-dto";

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

const defaultInitialValues: CreateCirculationDto = {
  dateFrequency: DateFrequency.Weekly,
  dateType: CirculationDateType.Single,
  parcours: [
    { ...defaultStop, descenteInterdite: true },
    { ...defaultStop, monteeInterdite: true },
  ],
  informationsConjoncturelles: [],
};

const FormContent: React.FC<FormContentProps> = () => {
  const { step } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { mapCreateCirculationToDto } = useCirculationMapper();

  const initialValues = useMemo<CreateCirculationDto>(() => {
    if (!state?.id) return defaultInitialValues;
    return mapCirculationToCreateCirculationDto(state as ICirculation);
  }, [state]);

  const handleSubmitForm = async (data: CreateCirculationDto) => {
    const mappedData = await mapCreateCirculationToDto(data);

    const responseData = await createCirculationService(mappedData);

    if (!responseData) throw new Error("No data returned from service");

    navigate(__routes__.Circulations.Main);

    toast.success("Circulation créée avec succès");
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
            <CirculationFormStepper steps={CREATE_CIRCULATION_FORM_STEPS} />
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
