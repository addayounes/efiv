import { api } from "@/lib/axios";
import type { IPaginatedResponse, IPaginationParams } from "@/types/pagination";
import type { ICirculation } from "@/types/entity/circulation";
import type { IFetchDraftParams } from "@/types/dto/fetch-draft-params";
import type { CreateCirculationApiPayload } from "@/types/dto/create-circulation";

const SERVICE_BASE_URL = "/api/Course";

export const createCirculationService = async (
  body: CreateCirculationApiPayload
) => {
  const { data } = await api.post(`${SERVICE_BASE_URL}/postCourse`, body);
  return data;
};

export const createDraftCirculationService = async (
  body: Partial<CreateCirculationApiPayload>
) => {
  const { data } = await api.post(`${SERVICE_BASE_URL}/postDraftCourse`, body);
  return data;
};

export const fetchDraftCirculationService = async (
  params: IFetchDraftParams
) => {
  const { data } = await api.get(`${SERVICE_BASE_URL}/searchDraft`, { params });
  return data;
};

export const fetchPreOperationalCirculationService = async (
  params: IPaginationParams
): Promise<IPaginatedResponse<ICirculation>> => {
  const { data } = await api.get(
    `${SERVICE_BASE_URL}/getPresOperationelleCourse`,
    { params }
  );
  return data;
};

export const fetchOperationalCirculationService = async (
  params: IPaginationParams
): Promise<IPaginatedResponse<ICirculation>> => {
  const { data } = await api.get(`${SERVICE_BASE_URL}/getOperationelleCourse`, {
    params,
  });
  return data;
};

export const fetchCirculationByIdService = async (
  id: string
): Promise<ICirculation> => {
  const { data } = await api.get(`${SERVICE_BASE_URL}/${id}`);
  return data;
};

export const getCouplableCirculationService = async (
  date: string,
  body: {
    codeUIC: string;
    departureHour: string;
  }[]
): Promise<ICirculation[]> => {
  const { data } = await api.post(
    `${SERVICE_BASE_URL}/searchCoupledTrains`,
    body,
    { params: { date } }
  );
  return data;
};

export const getRecurringDatesService = async (params: {
  startDate: string;
  endDate: string;
  dateFrequency: string;
  weeklyDays?: number[];
  monthDays?: number[];
}): Promise<string[]> => {
  const { data } = await api.get(`${SERVICE_BASE_URL}/recurringDates`, {
    params,
  });
  return data;
};
