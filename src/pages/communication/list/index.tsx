import EventsFilters from "./filters";
import Table from "@/components/table";
import { eventsMock, useEventsColumns } from "./columns";

interface EventsListProps {}

const EventsList: React.FC<EventsListProps> = ({}) => {
  const columns = useEventsColumns();

  return (
    <div className="px-6">
      <EventsFilters />
      <Table data={eventsMock} head={columns} bordered />
    </div>
  );
};

export default EventsList;
