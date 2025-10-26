import type { TagProps } from "antd";

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

export const StatusTagColorMap: Record<CirculationStatus, TagProps["color"]> = {
  [CirculationStatus.Ajoute]: "blue",
  [CirculationStatus.Prevue]: "success",
  [CirculationStatus.Supprime]: "error",
};

export const CIRCULATION_STATUS_OPTIONS = Object.values(CirculationStatus).map(
  (status) => ({
    label: StatusLabelMap[status],
    value: status,
  })
);
