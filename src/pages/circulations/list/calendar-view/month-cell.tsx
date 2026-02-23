import ItemBadge from "./item-badge";
import type { Dayjs } from "@/lib/dayjs";
import type { ICirculation } from "@/types/entity/circulation";

interface MonthCellProps {
  date: Dayjs;
  data: ICirculation[];
}

const MonthCell: React.FC<MonthCellProps> = ({ date, data }) => {
  const monthCirculations = data.filter((item) =>
    date.isSame(item.date, "month"),
  );
  return (
    <div className="flex flex-wrap gap-2">
      {monthCirculations.map((item) => (
        <ItemBadge key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MonthCell;
