import { api } from "@/lib/axios";
import type { CreateCirculationApiPayload } from "@/types/dto/create-circulation";
import type { IFetchDraftParams } from "@/types/dto/fetch-draft-params";
import type { ICirculation } from "@/types/entity/circulation";
import type { IPaginationParams } from "@/types/pagination";

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
): Promise<ICirculation[]> => {
  const { data } = await api.get(
    `${SERVICE_BASE_URL}/getPresOperationelleCourse`,
    { params }
  );
  return data;
};

export const fetchOperationalCirculationService = async (
  params: IPaginationParams
): Promise<ICirculation[]> => {
  const { data } = await api.get(`${SERVICE_BASE_URL}/getOperationelleCourse`, {
    params,
  });
  return data;
};
