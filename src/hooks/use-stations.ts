import { useEffect, useState } from "react";
import { searchStopsService, type StopDto } from "../services/ref";

export const useStations = (query: string = "", limit: number = 10) => {
  const [loading, setLoading] = useState(false);
  const [stations, setStations] = useState<StopDto[]>([]);

  const searchStops = async () => {
    try {
      setLoading(true);
      const result = await searchStopsService(query, limit);
      if (result?.length) setStations(result);
      else setStations([]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchStops();
    }, 600);

    return () => clearTimeout(timeout);
  }, [query]);

  return { stations, loading, searchStops };
};
