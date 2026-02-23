import { Tooltip } from "antd";
import { dayjs } from "@/lib/dayjs";
import type { ICirculation } from "@/types/entity/circulation";
import { DATE_FORMAT_NO_TIME, TIME_FORMAT } from "@/constants/date-format";

interface ItemBadgeProps {
  item: ICirculation;
}

const ItemBadge: React.FC<ItemBadgeProps> = ({ item }) => {
  const departureTime =
    dayjs(item?.parcours?.pointDeParcours?.[0]?.arret?.depart?.horaire).format(
      TIME_FORMAT,
    ) ?? "N/A";

  return (
    <Tooltip
      placement="top"
      title={`${dayjs(item.date).format(DATE_FORMAT_NO_TIME)} - ${departureTime}`}
    >
      <div className="text-xs px-2 py-0.5 rounded-full bg-primary text-white">
        {item.numeroCommercial}
      </div>
    </Tooltip>
  );
};

export default ItemBadge;
