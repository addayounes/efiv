import { api } from "../lib/axios";
import type { CreateCirculationApiPayload } from "../types/dto/create-circulation";

const SERVICE_BASE_URL = "/api/Course";

export const createCirculationService = async (
  body: CreateCirculationApiPayload
) => {
  const { data } = await api.post(`${SERVICE_BASE_URL}/postCourse`, body);
  return data;
};
