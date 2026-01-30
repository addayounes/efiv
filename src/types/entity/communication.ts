export interface CommunicationTemplate {
  id: string;
  name: string;
  description: string;
  motif: string;
  stages: Stage[];
}

export enum TimingUnit {
  MINUTES = "MINUTES",
  HOURS = "HOURS",
}

export interface TimingConfig {
  value: number;
  unit: TimingUnit;
}

export interface Stage {
  id: string;
  name: string;
  timingConfig?: TimingConfig;
  active: boolean;
  actions: Action[];
}

export interface Action {
  id: string;
  type: ActionType;
  details: SMSActionDetails | EmailActionDetails;
}

export enum ActionType {
  ShareOnX = "ShareOnX",
  ExternalSMS = "ExternalSMS",
  ExternalEmail = "ExternalEmail",
  StationPublish = "StationPublish",
  ExternalNotificationPush = "ExternalNotificationPush",
  InternalNotificationPush = "InternalNotificationPush",
}

export interface ActionDetails {}

// Variants

export interface SMSActionDetails extends ActionDetails {
  body: string;
}

export interface EmailActionDetails extends ActionDetails {
  subject: string;
  body: string;
}
