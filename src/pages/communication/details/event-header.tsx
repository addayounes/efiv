import {
  EventTypeLabelMap,
  EventTypeTagColorMap,
} from "@/constants/event-type";
import {
  EventStatusLabelMap,
  EventStatusTagColorMap,
} from "@/constants/event-status";
import dayjs from "dayjs";
import { Tag } from "antd";
import type { IEvent } from "@/types/entity/event";
import { DATE_FORMAT } from "@/constants/date-format";
import { EventSourceLabelMap } from "@/constants/event-source";
import { EventSeverityTagColorMap } from "@/constants/event-severity";
import { ArrowRight, Calendar, Gauge, TrainFront } from "lucide-react";

interface EventHeaderProps {
  event: IEvent;
}

const EventHeader: React.FC<EventHeaderProps> = ({ event }) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <Tag
            className="font-medium"
            color={EventTypeTagColorMap[event.actionType]}
          >
            {EventTypeLabelMap[event.actionType]}
          </Tag>
          <p className="text-sm mt-1 text-gray-600">{event.reason}</p>
        </div>

        <div>
          <p className="font-medium">{event.createdBy.name}</p>
          <p className="text-sm text-gray-500">
            {EventSourceLabelMap[event.source]}
          </p>
        </div>

        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-gray-600" />
            <p className="text-gray-600 text-[15px] font-medium">
              {event.startTime
                ? dayjs(event.startTime).format(DATE_FORMAT)
                : "N/A"}
            </p>
          </div>
          <ArrowRight className="mx-3" size={16} />
          <p className="text-gray-600 text-[15px] font-medium">
            {event.estimatedEndTime
              ? dayjs(event.estimatedEndTime).format(DATE_FORMAT)
              : "N/A"}
          </p>
        </div>

        <div
          className={`flex items-center gap-2 ${EventSeverityTagColorMap[event.severity]}`}
        >
          <Gauge size={18} />
          <span className="text-[15px] font-medium">{event.severity}</span>
        </div>

        <div className="flex items-center gap-2">
          <TrainFront size={18} className="text-gray-600" />
          <span className="flex flex-wrap gap-2">
            {event.impactedTrains?.length ? (
              event.impactedTrains.map((t) => (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full border bg-gray-100 border-gray-300 text-gray-600">
                  {t}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">Aucun train impacté</p>
            )}
          </span>
        </div>

        <div>
          <Tag
            className="font-medium"
            color={EventStatusTagColorMap[event.status]}
          >
            {EventStatusLabelMap[event.status]}
          </Tag>
        </div>
      </div>
    </div>
  );
};

export default EventHeader;
