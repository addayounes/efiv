import type { TimingConfig } from "@/types/entity/communication";

export const getPreviewText = (timingValue?: TimingConfig): string => {
  if (!timingValue) return "";

  const { value, unit } = timingValue;
  const unitText =
    unit === "MINUTES"
      ? value === 1
        ? "minute"
        : "minutes"
      : value === 1
        ? "heure"
        : "heures";

  return `Cette étape sera exécutée dans ${value ?? "-"} ${unitText}.`;
};

export const getShortPreviewText = (timingValue?: TimingConfig): string => {
  if (!timingValue) return "";

  const { value, unit } = timingValue;
  const unitText =
    unit === "MINUTES"
      ? value === 1
        ? "minute"
        : "minutes"
      : value === 1
        ? "heure"
        : "heures";

  return `Dans ${value ?? "-"} ${unitText}`;
};
