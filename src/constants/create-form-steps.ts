import type { StepProps } from "antd";

export const CREATE_CIRCULATION_FORM_STEPS: StepProps[] = [
  { title: "Générale" },
  { title: "Parcours" },
  { title: "Régime" },
  { title: "Récapitulatif" },
];

export enum CreateCirculationSteps {
  GENERAL = "general",
  ROUTE = "route",
  DATE = "date",
  SUMMARY = "summary",
}

export const CREATE_CIRCULATION_FORM_STEPS_KEYS = [
  CreateCirculationSteps.GENERAL,
  CreateCirculationSteps.ROUTE,
  CreateCirculationSteps.DATE,
  CreateCirculationSteps.SUMMARY,
];

export const getStepIndex = (step: CreateCirculationSteps) => {
  return CREATE_CIRCULATION_FORM_STEPS_KEYS.findIndex((s) => s === step);
};

export const isStepValid = (step: CreateCirculationSteps) => {
  return getStepIndex(step) !== -1;
};

export const getNextStep = (step: CreateCirculationSteps) => {
  const currentIndex = getStepIndex(step);
  if (currentIndex === -1) return undefined;

  const nextIndex = currentIndex + 1;
  return CREATE_CIRCULATION_FORM_STEPS_KEYS[nextIndex];
};

export const getPreviousStep = (step: CreateCirculationSteps) => {
  const currentIndex = getStepIndex(step);
  if (currentIndex === -1) return undefined;

  const previousIndex = currentIndex - 1;
  return CREATE_CIRCULATION_FORM_STEPS_KEYS[previousIndex];
};
