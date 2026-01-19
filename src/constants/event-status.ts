import type { TagProps } from "antd";
import { EventStatus } from "@/types/entity/event";

export const EventStatusLabelMap: Record<EventStatus, string> = {
  [EventStatus.NEW]: "Nouveau",
  [EventStatus.ONGOING]: "En cours",
  [EventStatus.RESOLVED]: "Résolue",
};

export const EventStatusTagColorMap: Record<EventStatus, TagProps["color"]> = {
  [EventStatus.NEW]: "blue",
  [EventStatus.ONGOING]: "orange",
  [EventStatus.RESOLVED]: "green",
};
