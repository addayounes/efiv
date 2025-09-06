export enum CirculationStatus {
  Ajoute = "ajoutée",
  Prevue = "prévue",
  Supprime = "supprimée",
}

export const StatusLabelMap: Record<CirculationStatus, string> = {
  [CirculationStatus.Ajoute]: "Ajoutée",
  [CirculationStatus.Prevue]: "Prévue",
  [CirculationStatus.Supprime]: "Supprimée",
};

export const CIRCULATION_STATUS_OPTIONS = Object.values(CirculationStatus).map(
  (status) => ({
    label: StatusLabelMap[status],
    value: status,
  })
);
