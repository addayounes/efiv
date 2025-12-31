import * as yup from "yup";
import { CreateCirculationSteps } from "@/constants/create-form-steps";
import type { CreateCirculationDto } from "@/types/dto/create-circulation";
import {
  CirculationDateType,
  DateFrequency,
} from "@/constants/circulation-date-types";

const parcoursItemSchema = yup.object().shape({
  station: yup.mixed().required("La gare est requise"),
  voieTransporteur: yup.string(),
  monteeInterdite: yup.boolean(),
  descenteInterdite: yup.boolean(),
  inversionComposition: yup.boolean(),

  arrivee: yup.object().shape({
    horaire: yup.string().nullable(),
    numeroSillon: yup.string(),
    couplageId: yup.string(),
  }),
  depart: yup.object().shape({
    horaire: yup.string().nullable(),
    numeroSillon: yup.string(),
    couplageId: yup.string(),
  }),

  informationsConjoncturelles: yup.array().of(
    yup.object().shape({
      categorie: yup.string().required("La catégorie est requise"),
      typeInformation: yup
        .string()
        .required("Le type d'information est requis"),
      texte: yup.string().required("Le texte est requis"),
      dateHeureDebutPublication: yup.string().required("Ce champ est requis"),
      dateHeureFinPublication: yup.string(),
    })
  ),
});

export const CreateCirculationSchema = yup
  .object<CreateCirculationDto>()
  .shape({
    endDate: yup.string(),
    startDate: yup.string(),
    monthDays: yup.array().of(yup.number()),
    weeklyDays: yup.array().of(yup.number()),
    // date: yup.string().required("Veuillez choisir un type de date"),
    numeroCommercial: yup.string().required("Le numéro commercial est requis"),
    nomCommercial: yup.string(),
    marqueCommerciale: yup.string(),
    ligneCommerciale: yup.string(),
    mode: yup.string().required("Le mode est requis"),
    sousMode: yup.string(),
    longueur: yup.string(),
    videVoyageur: yup.boolean(),
    courseSpeciale: yup.boolean(),
    libelleCourseSpeciale: yup.string(),
    origine: yup.mixed().required("L'origine est requise"),
    destination: yup.mixed().required("La destination est requise"),
    serviceDeCourse: yup.array().of(yup.string()),
    parcours: yup
      .array()
      .of(parcoursItemSchema)
      .min(2, "Veuillez ajouter au moins une origine et une destination")
      .test("horaire-conditions", function (parcours) {
        if (!parcours || parcours.length === 0) return true;

        for (let i = 0; i < parcours.length; i++) {
          const item = parcours[i];
          const isFirst = i === 0;
          const isLast = i === parcours.length - 1;

          if (!isFirst && !item.arrivee?.horaire) {
            return this.createError({
              path: `parcours[${i}].arrivee.horaire`,
              message: "L'heure d'arrivée est requise",
            });
          }

          if (!isLast && !item.depart?.horaire) {
            return this.createError({
              path: `parcours[${i}].depart.horaire`,
              message: "L'heure de départ est requise",
            });
          }
        }

        return true;
      }),
  });

export const getFieldsToValidateByStep = (
  values: CreateCirculationDto
): Record<string, string[]> => ({
  [CreateCirculationSteps.GENERAL]: [
    "numeroCommercial",
    "nomCommercial",
    "marqueCommerciale",
    "ligneCommerciale",
    "mode",
    "sousMode",
    "longueur",
    "videVoyageur",
    "courseSpeciale",
    "libelleCourseSpeciale",
    "origine",
    "destination",
    "serviceDeCourse",
  ],
  [CreateCirculationSteps.ROUTE]: ["parcours"],
  [CreateCirculationSteps.DATE]:
    values.dateType === CirculationDateType.Calendar
      ? [
          "endDate",
          "startDate",
          values.dateFrequency === DateFrequency.Monthly
            ? "monthDays"
            : "weeklyDays",
        ]
      : ["date"],
  [CreateCirculationSteps.SUMMARY]: [],
});
