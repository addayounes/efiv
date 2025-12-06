import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { getMotifsDeRetardService } from "@/services/ref";
import type { IMotifRetard } from "@/types/entity/motif-retard";

export const useMotifs = (query: string = "") => {
  const [loading, setLoading] = useState(false);
  const [motifs, setMotifs] = useState<IMotifRetard[]>([]);

  const fetchMotifs = async () => {
    try {
      setLoading(true);
      const data = await getMotifsDeRetardService({ term: query });
      setMotifs(data.items ?? []);
    } catch (error) {
      toast.error("Erreur lors du chargement des motifs de retard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchMotifs();
    }, 600);

    return () => clearTimeout(timeout);
  }, [query]);

  return { motifs, loading, fetchMotifs };
};
