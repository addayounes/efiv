import EventsList from "./list";
import PageHeader from "@/components/page-header";

const Communication: React.FC = () => {
  return (
    <div>
      <PageHeader title="Événements de communication" />
      <EventsList />
    </div>
  );
};

export default Communication;
