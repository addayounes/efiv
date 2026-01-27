export interface CommunicationTemplate {
  id: string;
  name: string;
  description: string;
  motif: string;
  stages: Stage[];
}

export interface Stage {
  id: string;
  name: string;
  executedAt: string;
  active: boolean;
  actions: Action[];
}

export interface Action {
  id: string;
  type: ActionType;
  details: SMSActionDetails | EmailActionDetails;
}

export enum ActionType {
  SMS = "SMS",
  ShareOnX = "ShareOnX",
  ExternalEmail = "ExternalEmail",
  InternalEmail = "InternalEmail",
  ShareOnFacebook = "ShareOnFacebook",
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
