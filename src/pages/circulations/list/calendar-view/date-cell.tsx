import ItemBadge from "./item-badge";
import { type Dayjs } from "@/lib/dayjs";
import type { ICirculation } from "@/types/entity/circulation";

interface DateCellProps {
  date: Dayjs;
  data: ICirculation[];
}

const DateCell: React.FC<DateCellProps> = ({ date, data }) => {
  const dayCirculations = data.filter((item) => date.isSame(item.date, "day"));
  return (
    <div className="flex flex-wrap gap-2">
      {dayCirculations.map((item) => (
        <ItemBadge key={item.id} item={item} />
      ))}
    </div>
  );
};

export default DateCell;
