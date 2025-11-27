import { api } from "@/lib/axios";
import type { CreateComposition } from "@/types/dto/create-circulation";

const SERVICE_BASE_URL = "/Referentiel";

export const createCompositionService = async (body: CreateComposition) => {
  const { data } = await api.post(
    `${SERVICE_BASE_URL}/createComposition`,
    body
  );
  return data;
};

export const getAllCompositionsService = async (): Promise<
  CreateComposition[]
> => {
  const { data } = await api.get(`${SERVICE_BASE_URL}/getAllCompositions`);
  return data;
};
