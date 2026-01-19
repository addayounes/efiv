import { useState } from "react";
import EventsFilters from "./filters";
import Table from "@/components/table";
import { eventsMock, useEventsColumns } from "./columns";

export interface IEventsFilters {
  status?: string;
  source?: string;
  actionType?: string;
}

export enum EventsSectionsFilterKeys {
  All = "Tout les événements",
  New = "Nouveaux",
  WithCommunication = "Communiqués",
  Resolved = "Résolus",
}

const EventsList: React.FC = () => {
  const [filters, setFilters] = useState<IEventsFilters>({});
  const [section, setSection] = useState(EventsSectionsFilterKeys.All);

  const columns = useEventsColumns();

  return (
    <div className="px-6">
      <EventsFilters
        filters={filters}
        setFilters={setFilters}
        section={section}
        setSection={setSection}
      />
      <Table data={eventsMock} head={columns} bordered />
    </div>
  );
};

export default EventsList;
