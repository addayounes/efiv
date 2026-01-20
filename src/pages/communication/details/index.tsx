import toast from "react-hot-toast";
import EventHeader from "./event-header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { eventsMock } from "../list/columns";
import { __routes__ } from "@/constants/routes";
import PageHeader from "@/components/page-header";
import type { IEvent } from "@/types/entity/event";

const EventDetails: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<IEvent | undefined>();

  useEffect(() => {
    if (!id) return;

    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        setEvent(eventsMock.find((event) => event.id === id));
      } catch (error) {
        console.log(error);
        toast.error("Erreur lors du chargement des détails de l'événement.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!event) return <div>Événement non trouvé.</div>;

  return (
    <div className="bg-primary-bg min-h-screen">
      <PageHeader
        title="Détails de l'événement"
        backTo={__routes__.Events.Main}
      />
      <main className="px-6">
        <EventHeader event={event} />
      </main>
    </div>
  );
};

export default EventDetails;
