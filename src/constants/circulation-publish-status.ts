import type { TagProps } from "antd";
import { EPublishStatus } from "@/types/entity/circulation";

export const PublishStatusLabelMap: Record<EPublishStatus, string> = {
  [EPublishStatus.AwaitingPublish]: "En attente",
  [EPublishStatus.Publishing]: "En cours",
  [EPublishStatus.Success]: "Publié avec succès",
  [EPublishStatus.Error]: "Erreur",
  [EPublishStatus.Rejected]: "Rejeté",
  [EPublishStatus.WaitingAsyncResponse]: "En attente de réponse",
};

export const PublishStatusTagColorMap: Record<
  EPublishStatus,
  TagProps["color"]
> = {
  [EPublishStatus.AwaitingPublish]: "default",
  [EPublishStatus.Publishing]: "blue",
  [EPublishStatus.Success]: "green",
  [EPublishStatus.Error]: "red",
  [EPublishStatus.Rejected]: "red",
  [EPublishStatus.WaitingAsyncResponse]: "orange",
};

export const CIRCULATION_PUBLISH_STATUS_OPTIONS = Object.values(
  EPublishStatus
).map((status) => ({
  label: PublishStatusLabelMap[status],
  value: status,
}));
