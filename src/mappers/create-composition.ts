import type { CreateComposition } from "@/types/dto/create-circulation";

export const mapCreateCompositionToDto = (
  data: CreateComposition
): CreateComposition =>
  ({
    id: "",
    name: data.name,
    materielRoulant: data.materielRoulant.map((mr, i1) => ({
      ...mr,
      rang: i1 + 1,
      elementMaterielRoulant: mr.elementMaterielRoulant.map((emr, i2) => ({
        ...emr,
        rang: i2 + 1,
        porte: (emr.porte ?? []).map((p, i3) => ({ ...p, rang: i3 + 1 })),
      })),
    })),
  } as unknown as CreateComposition);
