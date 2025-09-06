import type { StepProps } from "antd";

export const CREATE_CIRCULATION_FORM_STEPS: StepProps[] = [
  {
    title: "Informations générales",
  },
  {
    title: "Date & Calendrier",
  },
  {
    title: "Parcours",
  },
  {
    title: "Récapitulatif & Confirmation",
  },
];

export enum CreateCirculationSteps {
  GENERAL = "general",
  DATE = "date",
  ROUTE = "route",
  SUMMARY = "summary",
}

export const CREATE_CIRCULATION_FORM_STEPS_KEYS = [
  CreateCirculationSteps.GENERAL,
  CreateCirculationSteps.DATE,
  CreateCirculationSteps.ROUTE,
  CreateCirculationSteps.SUMMARY,
];
