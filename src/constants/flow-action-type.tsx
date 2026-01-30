import type React from "react";
import { ActionType } from "@/types/entity/communication";
import { Bell, Mail, Phone, X, Volume2 } from "lucide-react";

export interface EventTypeInfo {
  label: string;
  icon: React.JSX.Element;
  colors: {
    bg: string;
    text: string;
    border: string;
  };
}

export const FlowActionTypeConfigMap: Record<ActionType, EventTypeInfo> = {
  [ActionType.ExternalSMS]: {
    label: "Envoyer un SMS aux voyageurs",
    icon: <Phone size={14} />,
    colors: {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-800",
    },
  },
  [ActionType.ShareOnX]: {
    label: "Publier sur X",
    icon: <X size={14} />,
    colors: { bg: "bg-black", text: "text-white", border: "border-white" },
  },
  [ActionType.ExternalEmail]: {
    label: "Envoyer un mail aux voyageurs",
    icon: <Mail size={14} />,
    colors: {
      bg: "bg-orange-100",
      text: "text-orange-800",
      border: "border-orange-800",
    },
  },
  [ActionType.ExternalNotificationPush]: {
    label: "Push notif aux voyageurs",
    icon: <Bell size={14} />,
    colors: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-800",
    },
  },
  [ActionType.InternalNotificationPush]: {
    label: "Push notif pour agent",
    icon: <Bell size={14} />,
    colors: {
      bg: "bg-purple-100",
      text: "text-purple-800",
      border: "border-purple-800",
    },
  },
  [ActionType.StationPublish]: {
    label: "Publier dans une gare",
    icon: <Volume2 size={14} />,
    colors: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-800",
    },
  },
};

export const FlowActionTypes = Object.keys(FlowActionTypeConfigMap).map(
  (key) => ({
    ...FlowActionTypeConfigMap[key as ActionType],
    value: key,
  }),
);
