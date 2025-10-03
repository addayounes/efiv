import * as yup from "yup";
import { CreateCirculationSteps } from "../constants/create-form-steps";
import type { CreateCirculationDto } from "../types/dto/create-circulation";

export const CreateCirculationSchema = yup
  .object<CreateCirculationDto>()
  .shape({
    date: yup.string().required("Veuillez choisir un type de date"),
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
    origine: yup.string().required("L'origine est requise"),
    destination: yup.string().required("La destination est requise"),
    serviceDeCourse: yup.array().of(yup.string()),
    parcours: yup
      .array()
      .of(
        yup.object().shape({
          uic: yup.string().required("La gare est requise"),
          voieTransporteur: yup.string(),
          monteeInterdite: yup.boolean(),
          descenteInterdite: yup.boolean(),
          inversionComposition: yup.boolean(),

          arrivee: yup.object().shape({
            horaire: yup.string().required("L'heure d'arrivée est requise"),
            numeroSillon: yup.string(),
            couplageId: yup.string(),
          }),
          depart: yup.object().shape({
            horaire: yup.string().required("L'heure de départ est requise"),
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
              dateHeureDebutPublication: yup
                .string()
                .required("Ce champ est requis"),
              dateHeureFinPublication: yup.string(),
            })
          ),
        })
      )
      .min(2, "Veuillez ajouter au moins une origine et une destination"),
  });

export const FieldsToValidateByStep: Record<string, string[]> = {
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
    // "origine",
    // "destination",
    "serviceDeCourse",
  ],
  [CreateCirculationSteps.ROUTE]: ["parcours"],
  [CreateCirculationSteps.DATE]: ["date"],
  [CreateCirculationSteps.SUMMARY]: [],
};
