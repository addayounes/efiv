import { api } from "@/lib/axios";
import type { IMotifRetard } from "@/types/entity/motif-retard";
import type { IPaginatedResponse, IPaginationParams } from "@/types/pagination";

export interface StopDto {
  id: string;
  libelle12: string;
  libelle23: string;
}

const SERVICE_BASE_URL = "/Referentiel";

export const searchStopsService = async (query: string, limit: number = 10) => {
  const params = new URLSearchParams({ term: query, limit: limit.toString() });
  const { data } = await api.get(`${SERVICE_BASE_URL}/searchPointDesserte`, {
    params,
  });
  return data as StopDto[];
};

export const getAllStopsService = async () => {
  const { data } = await api.get(`${SERVICE_BASE_URL}/pointDesserte`);
  return (data ?? []) as StopDto[];
};

export const mapStations = (stations: StopDto[]) => {
  return stations.map((station) => ({
    label: station.libelle23,
    title: station.libelle12,
    value: station.id,
  }));
};

export const getMotifsDeRetardService = async (
  params: IPaginationParams
): Promise<IPaginatedResponse<IMotifRetard>> => {
  const { data } = await api.get(
    `${SERVICE_BASE_URL}/externalCausePagination`,
    {
      params,
    }
  );
  return data;
};
