import DateCell from "./date-cell";
import MonthCell from "./month-cell";
import type { Dayjs } from "@/lib/dayjs";
import { Calendar, Skeleton, type CalendarProps } from "antd";
import type { ICirculation } from "@/types/entity/circulation";

interface CirculationsCalendarViewProps {
  loading: boolean;
  data: ICirculation[];
}

const CirculationsCalendarView: React.FC<CirculationsCalendarViewProps> = ({
  data,
  loading,
}) => {
  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return <DateCell date={current} data={data} />;
    if (info.type === "month") return <MonthCell date={current} data={data} />;
    return info.originNode;
  };

  if (loading)
    return (
      <div className="space-y-6">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );

  return <Calendar cellRender={cellRender} />;
};

export default CirculationsCalendarView;
