import type React from "react";
import { Facebook, Mail, Phone, X } from "lucide-react";
import { ActionType } from "@/types/entity/communication";

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
  [ActionType.SMS]: {
    label: "SMS",
    icon: <Phone size={14} />,
    colors: {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-800",
    },
  },
  [ActionType.ShareOnX]: {
    label: "Share on X",
    icon: <X size={14} />,
    colors: { bg: "bg-black", text: "text-white", border: "border-white" },
  },
  [ActionType.ExternalEmail]: {
    label: "External Email",
    icon: <Mail size={14} />,
    colors: {
      bg: "bg-orange-100",
      text: "text-orange-800",
      border: "border-orange-800",
    },
  },
  [ActionType.InternalEmail]: {
    label: "Internal Email",
    icon: <Mail size={14} />,
    colors: {
      bg: "bg-teal-100",
      text: "text-teal-800",
      border: "border-teal-800",
    },
  },
  [ActionType.ShareOnFacebook]: {
    label: "Share on Facebook",
    icon: <Facebook size={14} />,
    colors: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-800",
    },
  },
};
