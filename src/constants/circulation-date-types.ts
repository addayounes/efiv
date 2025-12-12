export enum CirculationDateType {
  Single = "Single",
  Calendar = "Calendar",
}

export const TypeLabelMap: Record<CirculationDateType, string> = {
  [CirculationDateType.Single]: "Simple",
  [CirculationDateType.Calendar]: "Calendrier",
};

export const CIRCULATION_DATE_OPTIONS = Object.values(CirculationDateType).map(
  (status) => ({ label: TypeLabelMap[status], value: status })
);

export enum DateFrequency {
  Weekly = "Weekly",
  Monthly = "Monthly",
}

export const FrequencyLabelMap: Record<DateFrequency, string> = {
  [DateFrequency.Weekly]: "Hebdomadaire",
  [DateFrequency.Monthly]: "Mensuel",
};

export const DATE_FREQUENCY_OPTIONS = Object.values(DateFrequency).map(
  (status) => ({ label: FrequencyLabelMap[status], value: status })
);
