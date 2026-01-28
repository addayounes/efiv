import {
  TimingMode,
  TimingUnit,
  type TimingConfig,
} from "@/types/entity/communication";

export interface PresetOption {
  label: string;
  value: string;
  config: TimingConfig | null;
}

export const STAGE_TIMING_PRESETS: PresetOption[] = [
  {
    label: "Premières 10 minutes",
    value: "preset_1",
    config: { mode: TimingMode.WITHIN, value: 10, unit: TimingUnit.MINUTES },
  },
  {
    label: "Premières 30 minutes",
    value: "preset_2",
    config: { mode: TimingMode.WITHIN, value: 30, unit: TimingUnit.MINUTES },
  },
  {
    label: "Après 1 heure",
    value: "preset_3",
    config: { mode: TimingMode.AFTER, value: 1, unit: TimingUnit.HOURS },
  },
  {
    label: "Après 2 heures",
    value: "preset_4",
    config: { mode: TimingMode.AFTER, value: 2, unit: TimingUnit.HOURS },
  },
  {
    label: "Personnalisé…",
    value: "custom",
    config: null,
  },
];

export const getPresetByConfig = (config: TimingConfig | undefined) => {
  const customConfigPreset = STAGE_TIMING_PRESETS.find(
    (p) => p.value === "custom",
  );

  if (!config || Object.keys(config).length < 3) return customConfigPreset;

  const matchingPreset = STAGE_TIMING_PRESETS.find(
    (p) =>
      p?.config?.mode === config?.mode &&
      p?.config?.value === config?.value &&
      p?.config?.unit === config?.unit,
  );

  return matchingPreset || customConfigPreset;
};
