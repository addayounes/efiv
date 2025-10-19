import {
  type CreateCirculationSteps,
  CREATE_CIRCULATION_FORM_STEPS,
} from "@/constants/create-form-steps";
import type {
  ParcoursDto,
  CreateCirculationDto,
} from "@/types/dto/create-circulation";
import FormActions from "./actions";
import toast from "react-hot-toast";
import { dayjs } from "@/lib/dayjs";
import type { StepProps } from "antd";
import React, { useState } from "react";
import CirculationFormStepper from "./stepper";
import { __routes__ } from "@/constants/routes";
import FormikForm from "@/components/formik/form";
import FormContentRenderer from "./content-renderer";
import { useNavigate, useParams } from "react-router-dom";
import { createCirculationService } from "@/services/circulations";
import { useCirculationMapper } from "@/mappers/create-circulation";
import { CirculationDateType } from "@/constants/circulation-date-types";
import { CreateCirculationSchema } from "@/validation/create-circulation.validation";

interface FormContentProps {}

// @ts-ignore
const sampleCirculation = {
  dateType: "Single",
  parcours: [
    {
      station: {
        label: "Lyon Perrache",
        value: "87722025",
        key: "87722025",
        title: "Lyon Perr.",
      },
      voieTransporteur: "A",
      monteeInterdite: false,
      descenteInterdite: true,
      arrivee: {},
      depart: {
        horaire: dayjs("2025-10-12T11:08:00.000Z"),
      },
      informationsConjoncturelles: [],
    },
    {
      station: {
        label: "Bordeaux Saint-Jean",
        value: "87581009",
        key: "87581009",
        title: "Bordeaux",
      },
      voieTransporteur: "C",
      monteeInterdite: false,
      descenteInterdite: false,
      arrivee: {
        horaire: dayjs("2025-10-12T12:04:00.000Z"),
      },
      depart: {
        horaire: dayjs("2025-10-12T12:08:00.000Z"),
      },
      informationsConjoncturelles: [],
    },
    {
      station: {
        label: "Toulouse",
        value: "87440347",
        key: "87440347",
        title: "Toulouse",
      },
      monteeInterdite: false,
      descenteInterdite: false,
      arrivee: {
        horaire: dayjs("2025-10-12T14:35:00.000Z"),
      },
      depart: {
        horaire: dayjs("2025-10-12T14:38:00.000Z"),
      },
      informationsConjoncturelles: [],
    },
    {
      station: {
        label: "Avignon TGV",
        value: "87318964",
        key: "87318964",
        title: "Avignon TGV",
      },
      voieTransporteur: "12",
      monteeInterdite: false,
      descenteInterdite: false,
      inversionComposition: false,
      arrivee: {
        horaire: dayjs("2025-10-12T16:19:00.000Z"),
      },
      depart: {
        horaire: dayjs("2025-10-12T16:25:00.000Z"),
      },
      informationsConjoncturelles: [],
    },
    {
      station: {
        label: "Marseille Saint-Charles",
        value: "87751008",
        key: "87751008",
        title: "Marseille",
      },
      monteeInterdite: true,
      descenteInterdite: false,
      arrivee: {
        horaire: dayjs("2025-10-12T20:05:00.000Z"),
      },
      depart: {},
      informationsConjoncturelles: [],
    },
  ],
  informationsConjoncturelles: [
    {
      categorie: "PERTURBATION",
      typeInformation: "GARE",
      texte:
        "Réutilisation d'un train - Le train a été mis à disposition tardivement à la suite du retard sur un trajet précédent.",
      dateHeureDebutPublication: dayjs("2025-10-12T06:15:00.000Z"),
      dateHeureFinPublication: dayjs("2025-10-14T15:30:00.000Z"),
    },
  ],
  numeroCommercial: "6620",
  nomCommercial: "",
  marqueCommerciale: "TGV INOUI",
  ligneCommerciale: "C17",
  mode: "ferré",
  sousMode: "train",
  longueur: "court",
  origine: {
    label: "Lyon Perrache",
    value: "87722025",
    key: "87722025",
    title: "Lyon Perr.",
  },
  destination: {
    label: "Marseille Saint-Charles",
    value: "87751008",
    key: "87751008",
    title: "Marseille",
  },
  serviceDeCourse: ["OCEVP", "OCENY", "OCEWF"],
  date: dayjs("2025-10-14T22:00:00.000Z"),
};

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
  const navigate = useNavigate();
  const { mapCreateCirculationToDto } = useCirculationMapper();

  const [steps] = useState<StepProps[]>(CREATE_CIRCULATION_FORM_STEPS);

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
      initialValues={sampleCirculation as any}
      validationSchema={CreateCirculationSchema}
    >
      {() => {
        return (
          <main className="px-6">
            <CirculationFormStepper steps={steps} />
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
