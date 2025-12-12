import {
  DateFrequency,
  CirculationDateType,
  DATE_FREQUENCY_OPTIONS,
  CIRCULATION_DATE_OPTIONS,
} from "@/constants/circulation-date-types";
import { dayjs } from "@/lib/dayjs";
import { ArrowRight } from "lucide-react";
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
    <div className="">
      <div className="space-y-4 p-4">
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
      <div className="space-y-4 border-t border-gray-300">
        <div className="p-4 pb-0">
          <FormGroupTitle>Paramètres</FormGroupTitle>
        </div>
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
      <div className="space-y-4 px-4">
        <Field
          name="date"
          minDate={dayjs()}
          format="YYYY-MM-DD"
          as={DateTimePicker}
          className="min-w-[250px]"
          label="Date de circulation"
        />
      </div>
    ),
    [CirculationDateType.Calendar]: (
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 pt-0 border-b border-gray-300 w-full">
          <Field
            name="startDate"
            as={DateTimePicker}
            label="Date de début"
            className="min-w-[250px]"
          />
          <ArrowRight className="self-end mb-2 text-gray-500" size={20} />
          <Field
            name="endDate"
            as={DateTimePicker}
            label="Date de fin"
            className="min-w-[250px]"
          />
        </div>

        <div className="p-4 pt-0 space-y-4">
          <FormGroupTitle>Fréquence</FormGroupTitle>
          <Field
            as={Radio}
            optionType="button"
            buttonStyle="solid"
            name="dateFrequency"
            options={DATE_FREQUENCY_OPTIONS}
            defaultValue={DateFrequency.Weekly}
          />

          {FrequencySettingsMap[values.dateFrequency as DateFrequency]}
        </div>
      </div>
    ),
  };

  return DateSettingsMap[values.dateType as CirculationDateType] || <></>;
};

export default DateStep;
