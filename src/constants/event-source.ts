import { EventSource } from "@/types/entity/event";

export const EventSourceLabelMap: Record<EventSource, string> = {
  [EventSource.OIV]: "OIV",
  [EventSource.FIELD_AGENT]: "Agent de terrain",
};

export const EVENT_SOURCE_OPTIONS = Object.values(EventSource).map(
  (status) => ({
    label: EventSourceLabelMap[status],
    value: status,
  }),
);
