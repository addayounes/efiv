import {
  EventSource,
  EventStatus,
  type IEvent,
  EventActionType,
} from "@/types/entity/event";
import {
  EventStatusLabelMap,
  EventStatusTagColorMap,
} from "@/constants/event-status";
import {
  EventTypeLabelMap,
  EventTypeTagColorMap,
} from "@/constants/event-type";
import { Button, Tag } from "antd";
import { dayjs } from "@/lib/dayjs";
import { useNavigate } from "react-router-dom";
import type { ColumnType } from "antd/es/table";
import { __routes__ } from "@/constants/routes";
import { ChevronRight, Eye } from "lucide-react";
import { DATE_FORMAT } from "@/constants/date-format";
import { EventSourceLabelMap } from "@/constants/event-source";

export const useEventsColumns = (): ColumnType<IEvent>[] => {
  const navigate = useNavigate();

  const handleCommunicate = (event: IEvent) => {
    // TODO
    console.log(event);
  };

  return [
    {
      title: "Motif",
      dataIndex: "reason",
      key: "reason",
      render(_, record) {
        return <span>{record.reason}</span>;
      },
    },
    {
      title: "Type",
      dataIndex: "actionType",
      key: "actionType",
      render(_, record) {
        return (
          <Tag
            className="font-medium"
            color={EventTypeTagColorMap[record.actionType]}
          >
            {EventTypeLabelMap[record.actionType]}
          </Tag>
        );
      },
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      render(_, record) {
        return <span>{EventSourceLabelMap[record.source]}</span>;
      },
    },
    {
      title: "Heure de début",
      dataIndex: "startTime",
      key: "startTime",
      render(_, record) {
        return <span>{dayjs(record?.startTime).format(DATE_FORMAT)}</span>;
      },
    },
    {
      title: "Heure de fin estimée",
      dataIndex: "estimatedEndTime",
      key: "estimatedEndTime",
      render(_, record) {
        return (
          <span>{dayjs(record?.estimatedEndTime).format(DATE_FORMAT)}</span>
        );
      },
    },
    {
      title: "Sévérité",
      dataIndex: "severity",
      key: "severity",
      render(_, record) {
        return <span className="font-medium">{record.severity}</span>;
      },
    },
    {
      title: "Trains impactés",
      dataIndex: "impactedTrains",
      key: "impactedTrains",
      render(_, record) {
        return (
          <span className="flex flex-wrap gap-2">
            {record.impactedTrains.map((t) => (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full border bg-gray-100 border-gray-300 text-gray-600">
                {t}
              </span>
            ))}
          </span>
        );
      },
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      render(_, record) {
        return (
          <Tag
            className="font-medium"
            color={EventStatusTagColorMap[record.status]}
          >
            {EventStatusLabelMap[record.status]}
          </Tag>
        );
      },
    },
    {
      title: "Communication",
      dataIndex: "communication",
      key: "communication",
      render(_, record) {
        return (
          <div>
            {record.status === EventStatus.NEW ? (
              <Button
                onClick={() => handleCommunicate(record)}
                size="small"
                type="primary"
              >
                Communiquer
                <ChevronRight className="-mr-1.5 -ml-2" size={15} />
              </Button>
            ) : (
              <Button
                size="small"
                onClick={() =>
                  navigate(__routes__.Events.Details.replace(":id", record.id))
                }
              >
                <Eye className="-mr-1" size={15} />
                Détails
              </Button>
            )}
          </div>
        );
      },
    },
  ];
};

export const eventsMock: IEvent[] = [
  {
    id: "evt-001",
    actionType: EventActionType.DELAY,
    reason: "Technical issue on rolling stock",
    severity: 3,
    status: EventStatus.NEW,
    source: EventSource.OIV,
    startTime: "2026-01-19T07:45:00Z",
    estimatedEndTime: "2026-01-19T08:20:00Z",
    impactedTrains: ["TGV-8421"],
    createdBy: {
      userId: "u-102",
      role: "OIV",
      name: "Operations Center",
    },
  },
  {
    id: "evt-002",
    actionType: EventActionType.CANCELLATION,
    reason: "Crew unavailability",
    severity: 4,
    status: EventStatus.RESOLVED,
    source: EventSource.FIELD_AGENT,
    startTime: "2026-01-19T06:30:00Z",
    impactedTrains: ["TER-1902"],
    createdBy: {
      userId: "u-205",
      role: "OIV",
      name: "Regional Control",
    },
  },
  {
    id: "evt-003",
    actionType: EventActionType.DELAY,
    reason: "Adverse weather conditions",
    severity: 4,
    status: EventStatus.ONGOING,
    source: EventSource.OIV,
    startTime: "2026-01-19T16:10:00Z",
    estimatedEndTime: "2026-01-19T17:00:00Z",
    impactedTrains: ["IC-331", "IC-334", "IC-339"],
    createdBy: {
      userId: "system",
      role: "SYSTEM",
      name: "Weather Monitor",
    },
  },
  {
    id: "evt-004",
    actionType: EventActionType.ADDITIONAL_STOP,
    reason: "Passenger incident requiring emergency stop",
    severity: 4,
    status: EventStatus.ONGOING,
    source: EventSource.FIELD_AGENT,
    startTime: "2026-01-19T14:42:00Z",
    impactedTrains: ["RER-A-217"],
    createdBy: {
      userId: "u-311",
      role: "FIELD_AGENT",
      name: "On-board Supervisor",
    },
  },
  {
    id: "evt-005",
    actionType: EventActionType.STOP_CANCELLATION,
    reason: "Platform change at departure station",
    severity: 2,
    status: EventStatus.NEW,
    source: EventSource.OIV,
    startTime: "2026-01-19T18:05:00Z",
    impactedTrains: ["TGV-9103"],
    createdBy: {
      userId: "u-102",
      role: "OIV",
      name: "Operations Center",
    },
  },
  {
    id: "evt-006",
    actionType: EventActionType.DELAY,
    reason: "Congestion on rail network",
    severity: 2,
    status: EventStatus.RESOLVED,
    source: EventSource.OIV,
    startTime: "2026-01-19T09:15:00Z",
    estimatedEndTime: "2026-01-19T09:35:00Z",
    impactedTrains: ["TER-4821", "TER-4823"],
    createdBy: {
      userId: "system",
      role: "SYSTEM",
      name: "Traffic Optimizer",
    },
  },
];
