import { useEffect, useState } from "react";
import { searchStopsService } from "../services/search-stops";

export const useStations = (query: string = "", limit: number = 10) => {
  const [stations, setStations] = useState([]);

  const searchStops = async () => {
    const result = await searchStopsService(query, limit);
    setStations(result);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchStops();
    }, 600);

    return () => clearTimeout(timeout);
  }, [query]);

  return { stations, searchStops };
};
