import type { TagProps } from "antd";

export enum ParcoursStatus {
  STOP_DELETED = "stop_deleted",
  DELAY = "delay",
  STOP_ADDED = "stop_added",
}

export const StatusLabelMap: Record<ParcoursStatus, string> = {
  [ParcoursStatus.DELAY]: "Retard(s)",
  [ParcoursStatus.STOP_ADDED]: "Arrêt(s) ajouté(s)",
  [ParcoursStatus.STOP_DELETED]: "Arrêt(s) supprimé(s)",
};

export const StatusTagColorMap: Record<ParcoursStatus, TagProps["color"]> = {
  [ParcoursStatus.DELAY]: "orange",
  [ParcoursStatus.STOP_ADDED]: "blue",
  [ParcoursStatus.STOP_DELETED]: "red",
};

export const PARCOURS_STATUS_OPTIONS = Object.values(ParcoursStatus).map(
  (status) => ({
    label: StatusLabelMap[status],
    value: status,
  })
);

export const getParcoursStatusConfig = (status: ParcoursStatus) => ({
  label: StatusLabelMap[status],
  color: StatusTagColorMap[status],
});
