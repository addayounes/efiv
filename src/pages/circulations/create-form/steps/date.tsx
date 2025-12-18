import {
  DateFrequency,
  CirculationDateType,
  DATE_FREQUENCY_OPTIONS,
  CIRCULATION_DATE_OPTIONS,
} from "@/constants/circulation-date-types";
import { Calendar } from "antd";
import { cn } from "@/utils/cn";
import toast from "react-hot-toast";
import { dayjs } from "@/lib/dayjs";
import { useEffect, useState } from "react";
import Radio from "@/components/formik/radio";
import { Field, useFormikContext } from "formik";
import { groupByMonth } from "@/utils/date.utils";
import { ArrowRight, Loader2 } from "lucide-react";
import FormGroupTitle from "@/components/group-title";
import DateTimePicker from "@/components/formik/date-time";
import { getRecurringDatesService } from "@/services/circulations";
import WeeklyDateFrequency from "./components/date-frquency/weekly";
import MonthlyDateFrequency from "./components/date-frquency/monthly";
import type { CreateCirculationDto } from "@/types/dto/create-circulation";

const DateStep: React.FC = () => {
  const { values } = useFormikContext<CreateCirculationDto>();

  const isCalendarType = values.dateType === CirculationDateType.Calendar;

  return (
    <div className="flex min-h-full">
      <div className="flex-1">
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
      {isCalendarType && (
        <div className="flex-1 border-l border-gray-300 p-4 h-[calc(100vh-241px)] overflow-y-auto">
          <GeneratedDaysList />
        </div>
      )}
    </div>
  );
};

const DateSettingsRenderer: React.FC = () => {
  const { values } = useFormikContext<CreateCirculationDto>();

  const startDate = values.startDate;
  const endDate = values.endDate;

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
        <div className="flex items-center gap-4 px-4 w-full">
          <Field
            name="startDate"
            as={DateTimePicker}
            label="Date de début"
            className="min-w-[250px]"
            disabledDate={(currentDate: dayjs.Dayjs) =>
              (endDate
                ? currentDate.isAfter(dayjs(endDate).subtract(6, "day"))
                : false) || currentDate.isBefore(dayjs(), "day")
            }
          />
          <ArrowRight className="self-end mb-2 text-gray-500" size={20} />
          <Field
            name="endDate"
            as={DateTimePicker}
            label="Date de fin"
            className="min-w-[250px]"
            disabledDate={(currentDate: dayjs.Dayjs) =>
              (startDate
                ? currentDate.isBefore(dayjs(startDate).add(6, "day"), "day")
                : false) || currentDate.isBefore(dayjs(), "day")
            }
          />
        </div>

        {startDate && endDate && (
          <div className="p-4 space-y-4 border-t border-gray-300">
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
        )}
      </div>
    ),
  };

  return DateSettingsMap[values.dateType as CirculationDateType] || <></>;
};

const GeneratedDaysList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { values } = useFormikContext<CreateCirculationDto>();
  const [generatedDays, setGeneratedDays] = useState<string[]>([]);

  const groupedDates = groupByMonth(generatedDays);

  useEffect(() => {
    const getGeneratedDates = async () => {
      try {
        setLoading(true);

        if (
          values.dateType !== CirculationDateType.Calendar ||
          !values.startDate ||
          !values.endDate ||
          !values.dateFrequency ||
          (values.dateFrequency === DateFrequency.Weekly &&
            !values.weeklyDays?.length) ||
          (values.dateFrequency === DateFrequency.Monthly &&
            !values.monthDays?.length)
        )
          return;

        const result = await getRecurringDatesService({
          startDate: dayjs(values.startDate).format("YYYY-MM-DD"),
          endDate: dayjs(values.endDate).format("YYYY-MM-DD"),
          dateFrequency: values.dateFrequency,
          weeklyDays: values.weeklyDays,
          monthDays: values.monthDays,
        });

        setGeneratedDays(result);
      } catch (error) {
        console.log(error);
        toast.error("Erreur lors de la génération des dates");
      } finally {
        setLoading(false);
      }
    };

    getGeneratedDates();
  }, [
    values.dateType,
    values.startDate,
    values.endDate,
    values.dateFrequency,
    values.weeklyDays,
    values.monthDays,
  ]);

  return (
    <div>
      <FormGroupTitle>
        <div className="flex items-center gap-2">
          Dates générées
          {loading && <Loader2 size={20} className="animate-spin" />}
        </div>
      </FormGroupTitle>

      {generatedDays.length ? (
        <div className="grid grid-cols-2 gap-8 mt-4">
          {Object.entries(groupedDates).map(([month, dates]) => {
            const selectedSet = new Set(dates);
            return (
              <Calendar
                key={month}
                fullscreen={false}
                disabledDate={() => true}
                value={dayjs(month + "-01")}
                headerRender={() => (
                  <div style={{ textAlign: "center", fontWeight: 600 }}>
                    {dayjs(month).format("MMMM YYYY")}
                  </div>
                )}
                fullCellRender={(value) => {
                  const isSelected = selectedSet.has(
                    value.format("YYYY-MM-DD")
                  );
                  return (
                    <div
                      className={cn(
                        "h-full flex items-center justify-center",
                        isSelected ? "bg-primary text-white" : ""
                      )}
                    >
                      {value.date()}
                    </div>
                  );
                }}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-gray-500 text-center pt-10">
          Aucune date générée, veuillez choisir des paramètres de date
        </div>
      )}
    </div>
  );
};

export default DateStep;
