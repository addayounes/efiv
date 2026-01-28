import { useEffect, useMemo } from "react";
import Select from "@/components/formik/select";
import { Field, useFormikContext } from "formik";
import TextField from "@/components/formik/textfield";
import { getPreviewText } from "@/utils/flow-stage.utils";
import { STAGE_TIMING_PRESETS } from "@/constants/stage-timing";
import type { TimingConfig } from "@/types/entity/communication";

interface StageTimingConfiguratorProps {
  name: string;
}

const StageTimingConfigurator = ({ name }: StageTimingConfiguratorProps) => {
  const { values, setFieldValue } = useFormikContext<Record<string, any>>();

  const timingValue: TimingConfig | undefined = values[name];

  const isCustomTiming = values?.preset === "custom";

  const previewText = useMemo(
    (): string => getPreviewText(timingValue),
    [timingValue],
  );

  useEffect(() => {
    if (values?.preset && values.preset !== "custom") {
      const preset = STAGE_TIMING_PRESETS.find(
        (preset) => preset.value === values.preset,
      );
      if (preset) setFieldValue(name, preset.config);
    }
  }, [values?.preset]);

  return (
    <div className="space-y-4">
      <Field
        as={Select}
        name="preset"
        className="w-full"
        label="Déclenchement"
        placeholder="Déclencher cette étape"
        options={STAGE_TIMING_PRESETS.map((preset) => ({
          label: preset.label,
          value: preset.value,
        }))}
      />

      {isCustomTiming && (
        <div>
          <div className="flex items-center gap-4">
            <Field
              as={Select}
              placeholder="Mode"
              className="w-full min-w-28"
              name={`${name}.mode`}
              options={[
                { label: "Dans les", value: "WITHIN" },
                { label: "Après", value: "AFTER" },
              ]}
            />
            <Field
              min={1}
              max={96}
              type="number"
              as={TextField}
              className="w-full"
              placeholder="Valeur"
              name={`${name}.value`}
            />
            <Field
              as={Select}
              className="w-full"
              placeholder="Unité"
              name={`${name}.unit`}
              options={[
                { label: "minutes", value: "MINUTES" },
                { label: "heures", value: "HOURS" },
              ]}
            />
          </div>
        </div>
      )}

      {timingValue && previewText.length && (
        <div className="text-sm text-gray-600 italic bg-gray-50 p-3 rounded">
          {previewText}
        </div>
      )}
    </div>
  );
};

export default StageTimingConfigurator;
