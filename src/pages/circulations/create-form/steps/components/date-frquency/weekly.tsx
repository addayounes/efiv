import { cn } from "@/utils/cn";
import { useFormikContext } from "formik";
import { WEEKDAYS } from "@/constants/days-of-week";
import type { CreateCirculationDto } from "@/types/dto/create-circulation";

interface WeeklyDateFrequencyProps {}

const WeeklyDateFrequency: React.FC<WeeklyDateFrequencyProps> = ({}) => {
  const { values, setFieldValue } = useFormikContext<CreateCirculationDto>();

  const toggleDay = (dayValue: number) => {
    const currentDays = values.weeklyDays ?? [];
    if (currentDays.includes(dayValue)) {
      setFieldValue(
        "weeklyDays",
        currentDays.filter((day) => day !== dayValue)
      );
    } else {
      setFieldValue("weeklyDays", [...currentDays, dayValue]);
    }
  };

  return (
    <div className="space-y-1 mt-6">
      <p className="text-sm text-gray-700 font-medium">
        Sélectionner les jours de la semaine
      </p>
      <div className="flex items-center gap-2">
        {WEEKDAYS.map((day, index) => {
          const isSelected = (values.weeklyDays ?? []).includes(index + 1);
          return (
            <div
              key={day}
              onClick={() => toggleDay(index + 1)}
              className={cn(
                "px-4 py-[7px] rounded-md border cursor-pointer capitalize",
                isSelected
                  ? "border-primary bg-primary text-white"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              )}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyDateFrequency;
