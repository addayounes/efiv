import type { TagProps } from "antd";
import { EventActionType } from "@/types/entity/event";

export const EventTypeLabelMap: Record<EventActionType, string> = {
  [EventActionType.DELAY]: "Retard",
  [EventActionType.CANCELLATION]: "Circulation supprimée",
  [EventActionType.STOP_CANCELLATION]: "Arrêt supprimé",
  [EventActionType.ADDITIONAL_STOP]: "Arrêt supplémentaire",
};

export const EventTypeTagColorMap: Record<EventActionType, TagProps["color"]> =
  {
    [EventActionType.DELAY]: "orange",
    [EventActionType.CANCELLATION]: "error",
    [EventActionType.STOP_CANCELLATION]: "error",
    [EventActionType.ADDITIONAL_STOP]: "blue",
  };
