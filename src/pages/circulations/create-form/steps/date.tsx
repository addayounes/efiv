import {
  DateFrequency,
  CirculationDateType,
  DATE_FREQUENCY_OPTIONS,
  CIRCULATION_DATE_OPTIONS,
} from "@/constants/circulation-date-types";
import { dayjs } from "@/lib/dayjs";
import Radio from "@/components/formik/radio";
import { Field, useFormikContext } from "formik";
import FormGroupTitle from "@/components/group-title";
import DateTimePicker from "@/components/formik/date-time";
import WeeklyDateFrequency from "./components/date-frquency/weekly";
import MonthlyDateFrequency from "./components/date-frquency/monthly";
import type { CreateCirculationDto } from "@/types/dto/create-circulation";

interface DateStepProps {}

const DateStep: React.FC<DateStepProps> = ({}) => {
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-4">
        <FormGroupTitle>Type de régime</FormGroupTitle>
        <Field
          as={Radio}
          name="dateType"
          optionType="button"
          buttonStyle="solid"
          options={CIRCULATION_DATE_OPTIONS}
          defaultValue={CirculationDateType.Single}
        />
      </div>
      <div className="space-y-4">
        <FormGroupTitle>Paramètres</FormGroupTitle>
        <DateSettingsRenderer />
      </div>
    </div>
  );
};

const DateSettingsRenderer: React.FC = () => {
  const { values } = useFormikContext<CreateCirculationDto>();

  const FrequencySettingsMap = {
    [DateFrequency.Weekly]: <WeeklyDateFrequency />,
    [DateFrequency.Monthly]: <MonthlyDateFrequency />,
  };

  const DateSettingsMap = {
    [CirculationDateType.Single]: (
      <div className="space-y-4">
        <Field
          name="date"
          label="Date"
          minDate={dayjs()}
          as={DateTimePicker}
          format="YYYY-MM-DD"
        />
      </div>
    ),
    [CirculationDateType.Calendar]: (
      <div className="space-y-4">
        <div className="flex items-center gap-4 w-fit">
          <Field name="startDate" as={DateTimePicker} label="Date de début" />
          <Field name="endDate" as={DateTimePicker} label="Date de fin" />
        </div>
        <Field
          as={Radio}
          label="Fréquence"
          optionType="button"
          buttonStyle="solid"
          name="dateFrequency"
          options={DATE_FREQUENCY_OPTIONS}
          defaultValue={DateFrequency.Weekly}
        />

        {FrequencySettingsMap[values.dateFrequency as DateFrequency]}
      </div>
    ),
  };

  return DateSettingsMap[values.dateType as CirculationDateType] || <></>;
};

export default DateStep;
