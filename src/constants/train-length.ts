export enum TrainLength {
  Long = "long",
  Short = "court",
  ExceptionallyShort = "exceptionnellement court",
}

export const TrainLengthLabelMap: Record<TrainLength, string> = {
  [TrainLength.Long]: "Long",
  [TrainLength.Short]: "Court",
  [TrainLength.ExceptionallyShort]: "Exceptionnellement court",
};

export const TRAIN_LENGTH_OPTIONS = Object.values(TrainLength).map(
  (length) => ({
    label: TrainLengthLabelMap[length],
    value: length,
  })
);
