import {
  CirculationDateType,
  DateFrequency,
} from "@/constants/circulation-date-types";
import type { ICirculation } from "@/types/entity/circulation";
import type { CreateCirculationDto } from "@/types/dto/create-circulation";

export const mapCirculationToCreateCirculationDto = (
  data: ICirculation
): CreateCirculationDto => ({
  date: data.date,
  destination: {
    label: data.destination.libelle12,
    title: data.destination.libelle23,
    value: data.destination.codeUIC,
  },
  origine: {
    label: data.origine.libelle12,
    title: data.origine.libelle23,
    value: data.origine.codeUIC,
  },
  mode: data.mode,
  sousMode: data.sousMode,
  videVoyageur: data.videVoyageur,
  nomCommercial: data.nomCommercial,
  numeroCommercial: data.numeroCommercial,
  ligneCommerciale: data.ligneCommerciale?.libelle,
  marqueCommerciale: data.marqueCommerciale?.libelle,
  serviceDeCourse: data.serviceDeCourse.map((sdc) => sdc.id),
  informationsConjoncturelles: data.informationsConjoncturelles ?? [],
  dateFrequency: DateFrequency.Weekly,
  dateType: CirculationDateType.Single,
  longueur: data.longueur,
  courseSpeciale: data.speciale?.courseSpeciale,
  libelleCourseSpeciale: data.speciale?.libelleCourseSpeciale,
  parcours: (data.parcours.pointDeParcours ?? []).map((stop) => ({
    station: {
      value: stop?.desserte?.codeUIC,
      title: stop?.desserte?.libelle12,
      label: stop?.desserte?.libelle23,
    },
    descenteInterdite: stop?.arret?.descenteInterdite,
    monteeInterdite: stop?.arret?.monteeInterdite,
    inversionComposition: stop?.arret?.inversionComposition,
    arrivee: {
      horaire: stop?.arret?.arrivee?.horaire,
      numeroSillon: stop?.arret?.arrivee?.numeroSillon,
    },
    depart: {
      horaire: stop?.arret?.depart?.horaire,
      numeroSillon: stop?.arret?.depart?.numeroSillon,
    },
    rang: stop.rang,
    voieTransporteur: stop?.zoneEmbarquement?.voieVoyageur,
    // TODO: fix this
    composition: {
      title: stop?.arret?.depart?.composition as any,
      label: stop?.arret?.depart?.composition
        ? "Composition"
        : "Aucune composition",
      value: "",
    },
    informationsConjoncturelles: stop?.informationsConjoncturelles || [],
  })),
});
