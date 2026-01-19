import { Button, Segmented, Select } from "antd";
import { Trash2 } from "lucide-react";
import { EventsSectionsFilterKeys, type IEventsFilters } from ".";
import { EVENT_TYPE_OPTIONS } from "@/constants/event-type";
import { EVENT_SOURCE_OPTIONS } from "@/constants/event-source";
// import { EVENT_STATUS_OPTIONS } from "@/constants/event-status";

interface EventsFiltersProps {
  filters: IEventsFilters;
  setFilters: React.Dispatch<React.SetStateAction<IEventsFilters>>;
  section: EventsSectionsFilterKeys;
  setSection: React.Dispatch<React.SetStateAction<EventsSectionsFilterKeys>>;
}

const EventsFilters: React.FC<EventsFiltersProps> = ({
  filters,
  setFilters,
  section,
  setSection,
}) => {
  const showResetAll = Object.values(filters).some(
    (value) => value !== undefined,
  );

  const handleResetAll = () => setFilters({});

  return (
    <div className="flex items-center justify-between py-6">
      <div>
        <Segmented<string>
          value={section}
          style={{ fontWeight: 500 }}
          options={Object.values(EventsSectionsFilterKeys)}
          onChange={(value) => setSection(value as EventsSectionsFilterKeys)}
        />
      </div>

      <div className="flex items-center gap-4">
        {/* <Select
          allowClear
          className="w-30"
          placeholder="Statut"
          options={EVENT_STATUS_OPTIONS}
          value={filters.status}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, status: value as string }))
          }
        /> */}

        <Select
          allowClear
          className="w-36"
          placeholder="Source"
          value={filters.source}
          options={EVENT_SOURCE_OPTIONS}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, source: value as string }))
          }
        />

        <Select
          allowClear
          className="w-44"
          placeholder="Type"
          options={EVENT_TYPE_OPTIONS}
          value={filters.actionType}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, actionType: value as string }))
          }
        />

        {showResetAll && (
          <Button onClick={handleResetAll} danger>
            <Trash2 size={15} className="-mx-1" />
            Réinitialiser tout
          </Button>
        )}
      </div>
    </div>
  );
};

export default EventsFilters;
