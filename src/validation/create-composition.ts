import * as Yup from "yup";
import { ElementMaterielRoulantType } from "@/types/dto/create-circulation";

export const compositionSchema = Yup.object({
  code: Yup.string().required("Le code de la composition est requis"),
  name: Yup.string().required("Le nom de la composition est requis"),
  materielRoulant: Yup.array()
    .of(
      Yup.object({
        serie: Yup.string(),
        sousSerie: Yup.string(),
        sousSerie2: Yup.string(),
        elementMaterielRoulant: Yup.array()
          .of(
            Yup.object({
              type: Yup.string()
                .oneOf(Object.values(ElementMaterielRoulantType))
                .required(),
              libelle: Yup.string().nullable(),
              longueur: Yup.number()
                .nullable()
                .min(0, "La position doit être au moins 0"),
              porte: Yup.array()
                .of(
                  Yup.object({
                    position: Yup.number()
                      .required("La position est requise")
                      .min(0, "La position doit être au moins 0"),
                  })
                )
                .nullable(),
            })
          )
          .test(
            "has-head",
            "Chaque matériel roulant doit contenir une tête",
            (arr) =>
              Array.isArray(arr) &&
              arr.some((el) => el.type === ElementMaterielRoulantType.Head)
          )
          .test(
            "has-tail",
            "Chaque matériel roulant doit contenir une queue",
            (arr) =>
              Array.isArray(arr) &&
              arr.some((el) => el.type === ElementMaterielRoulantType.Tail)
          )
          .test(
            "has-vehicle",
            "Chaque matériel roulant doit contenir au moins une voiture",
            (arr) =>
              Array.isArray(arr) &&
              arr.some((el) => el.type === ElementMaterielRoulantType.Vehicle)
          )
          .test(
            "head-at-index-0",
            "Le premier élément doit être une tête",
            (arr) =>
              Array.isArray(arr) &&
              arr[0]?.type === ElementMaterielRoulantType.Head
          )
          .test(
            "tail-at-last-index",
            "Le dernier élément doit être une queue",
            (arr) =>
              Array.isArray(arr) &&
              arr[arr.length - 1]?.type === ElementMaterielRoulantType.Tail
          ),
      })
    )
    .min(1, "Au moins un matériel roulant est requis")
    .required(),
});
