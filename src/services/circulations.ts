import { api } from "@/lib/axios";
import type { CreateCirculationApiPayload } from "@/types/dto/create-circulation";
import type { IFetchDraftParams } from "@/types/dto/fetch-draft-params";

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
