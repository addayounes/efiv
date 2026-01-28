import type { TimingConfig } from "@/types/entity/communication";
import { capitalizeFirstLetter } from "./string.utils";

export const getPreviewText = (timingValue?: TimingConfig): string => {
  if (!timingValue) return "";

  const { mode, value, unit } = timingValue;
  const unitText =
    unit === "MINUTES"
      ? value === 1
        ? "minute"
        : "minutes"
      : value === 1
        ? "heure"
        : "heures";

  if (mode === "WITHIN") {
    const firstText = value === 1 ? "première" : "premières";
    return `Cette étape sera exécutée dans les ${value ?? "-"} ${firstText} ${unitText} après le début de l'incident.`;
  } else {
    return `Cette étape sera exécutée après ${value ?? "-"} ${unitText}.`;
  }
};

export const getShortPreviewText = (timingValue?: TimingConfig): string => {
  if (!timingValue) return "";

  const { mode, value, unit } = timingValue;
  const unitText =
    unit === "MINUTES"
      ? value === 1
        ? "minute"
        : "minutes"
      : value === 1
        ? "heure"
        : "heures";

  if (mode === "WITHIN") {
    const firstText = value === 1 ? "première" : "premières";
    return `${capitalizeFirstLetter(firstText)} ${value ?? "-"}  ${unitText}`;
  } else {
    return `Après ${value ?? "-"} ${unitText}`;
  }
};
