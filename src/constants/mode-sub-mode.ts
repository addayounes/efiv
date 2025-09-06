export enum CirculationMode {
  Ferre = "ferré",
  Routier = "routier",
}

export const ModeLabelMap: Record<CirculationMode, string> = {
  [CirculationMode.Ferre]: "Férré",
  [CirculationMode.Routier]: "Routier",
};

export const CIRCULATION_MODE_OPTIONS = Object.values(CirculationMode).map(
  (status) => ({
    label: ModeLabelMap[status],
    value: status,
  })
);

export enum CirculationSubMode {
  Train = "train",
  TramTrain = "tram-train",
  Car = "car",
}

export const SubModeLabelMap: Record<CirculationSubMode, string> = {
  [CirculationSubMode.Train]: "Train",
  [CirculationSubMode.TramTrain]: "Tram-Train",
  [CirculationSubMode.Car]: "Car",
};

export const CIRCULATION_SUBMODE_OPTIONS = Object.values(
  CirculationSubMode
).map((status) => ({
  label: SubModeLabelMap[status],
  value: status,
}));

export const MODES_WITH_SUBMODES = [
  {
    mode: CirculationMode.Ferre,
    subModes: [CirculationSubMode.Train, CirculationSubMode.TramTrain],
  },
  {
    mode: CirculationMode.Routier,
    subModes: [CirculationSubMode.Car],
  },
];

export const getSubModesForMode = (mode: CirculationMode) => {
  return (
    MODES_WITH_SUBMODES.find((m) => m.mode === mode)?.subModes.map(
      (subMode) => ({
        label: SubModeLabelMap[subMode],
        value: subMode,
      })
    ) || []
  );
};
