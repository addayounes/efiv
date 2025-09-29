import { api } from "../lib/axios";

export const searchStopsService = async (query: string, limit: number = 10) => {
  const params = new URLSearchParams({ term: query, limit: limit.toString() });
  const { data } = await api.get("/Referentiel/searchPointDesserte", {
    params,
  });
  return data;
};

export const mapStations = (stations: any[]) => {
  return stations.map((station) => ({
    label: station.libelle23,
    value: station.id,
  }));
};
