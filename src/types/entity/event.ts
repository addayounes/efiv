export enum EventActionType {
  DELAY = "DELAY",
  CANCELLATION = "CANCELLATION",
  STOP_CANCELLATION = "STOP_CANCELLATION",
  ADDITIONAL_STOP = "ADDITIONAL_STOP",
}

export enum EventSource {
  OIV = "OIV",
  FIELD_AGENT = "FIELD_AGENT",
}

export enum EventStatus {
  NEW = "NEW",
  ONGOING = "ONGOING",
  RESOLVED = "RESOLVED",
}

export interface IEvent {
  id: string;
  reason: string;
  createdBy: any;
  startTime: string;
  source: EventSource;
  status: EventStatus;
  impactedTrains: string[];
  estimatedEndTime?: string;
  actionType: EventActionType;
  severity: 1 | 2 | 3 | 4;
}
