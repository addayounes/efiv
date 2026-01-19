import { EventSource } from "@/types/entity/event";

export const EventSourceLabelMap: Record<EventSource, string> = {
  [EventSource.OIV]: "OIV",
  [EventSource.FIELD_AGENT]: "Agent de terrain",
};
