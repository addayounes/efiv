import { cn } from "@/utils/cn";
import { useFormikContext } from "formik";
import type { CreateCirculationDto } from "@/types/dto/create-circulation";

interface MonthlyDateFrequencyProps {}

const MonthlyDateFrequency: React.FC<MonthlyDateFrequencyProps> = ({}) => {
  const { values, setFieldValue } = useFormikContext<CreateCirculationDto>();

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const toggleDayOfMonth = (dayValue: number) => {
    const currentDays = values.monthDays ?? [];
    if (currentDays.includes(dayValue)) {
      setFieldValue(
        "monthDays",
        currentDays.filter((day) => day !== dayValue)
      );
    } else {
      setFieldValue("monthDays", [...currentDays, dayValue]);
    }
  };

  return (
    <div className="space-y-1">
      <p className="text-sm text-gray-700 font-medium">
        Sélectionner les jours du mois
      </p>

      <div className="grid grid-cols-7 w-fit gap-2">
        {daysInMonth.map((day, index) => {
          const isSelected = (values.monthDays ?? []).includes(index + 1);

          return (
            <div
              key={day}
              onClick={() => toggleDayOfMonth(index + 1)}
              className={cn(
                "flex items-center justify-center px-4 py-[7px] rounded-md border cursor-pointer capitalize",
                isSelected
                  ? "border-primary bg-primary text-white"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              )}
            >
              <span>{day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlyDateFrequency;
