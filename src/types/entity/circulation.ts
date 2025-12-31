import type {
  Composition,
  InformationsConjoncturelle,
} from "../dto/create-circulation";

export enum EPublishStatus {
  AwaitingPublish = "awaiting_publish",
  Publishing = "publishing",
  Success = "success",
  Error = "error",
  Rejected = "rejected",
  WaitingAsyncResponse = "awaiting_async-response",
}

export interface ICirculation {
  date: string;
  destinationInitiale?: string;
  origineInitiale?: string;
  destination: Destination;
  origine: Origine;
  marqueCommerciale: IdLabel;
  ligneCommerciale: IdLabel;
  nomCommercial: string;
  mode: string;
  numeroCommercial: string;
  parcours: Parcours;
  partenaire: Partenaire;
  serviceDeCourse: ServiceDeCourse[];
  sousMode: string;
  statut: string;
  transporteur: IdLabel;
  id: string;
  videVoyageur?: boolean;
  longueur?: string;
  publishStatus: EPublishStatus;
  chainageCourseSuivante?: ChainageCourseSuivante;
  compositions?: CompositionsList[];
  informationsConjoncturelles?: InformationsConjoncturelle[];
  speciale?: Speciale;
}

export interface Speciale {
  courseSpeciale?: boolean;
  libelleCourseSpeciale?: string;
}

export interface CompositionsList {
  generatedId: string;
  composition: Composition;
}

export interface Destination {
  codeUIC: string;
  libelle12: string;
  libelle23: string;
}

export interface Origine {
  codeUIC: string;
  libelle12: string;
  libelle23: string;
}

export interface IdLabel {
  id: string;
  libelle: string;
}

export interface CodeLabel {
  code: string;
  libelle: string;
}

export interface Parcours {
  pointDeParcours: PointDeParcour[];
}

export interface PointDeParcour {
  arret: Arret;
  desserte: Desserte;
  rang: number;
  statuts: Statut[];
  zoneEmbarquement: ZoneEmbarquement;
  informationsConjoncturelles?: InformationsConjoncturelle[];
}

export interface Arret {
  arrivee: ArriveeDepart;
  depart: ArriveeDepart;
  descenteInterdite?: boolean;
  monteeInterdite?: boolean;
  inversionComposition?: boolean;
}

export interface ArriveeDepart {
  horaire: string;
  suppressionDiffusable?: boolean;
  retardReel?: number;
  retardVoyageur?: number;
  mentionVia?: boolean;
  mentionDirect?: boolean;
  numeroSillon?: string;
  motifVoyageur?: CodeLabel;
  motifTransporteurAsync?: CodeLabel;
  // TODO: remove this and only keep reference
  composition?: Composition;
  referenceIdComposition?: string;
}

export interface Desserte {
  codeUIC: string;
  libelle12: string;
  libelle23: string;
}

export enum PointDeParcourStatut {
  AJOUTE = "ajouté",
  ARRET_VERS_DESTINATION = "arrêt vers destination",
  ARRET_VERS_ORIGINE = "arrêt vers origine",
  ARRET_VERS_PASSAGE = "arrêt vers passage",
  DESTINATION_VERS_ARRET = "destination vers arrêt",
  HORAIRES_MODIFIES = "horaires modifiés",
  ORIGINE_VERS_ARRET = "origine vers arrêt",
  PASSAGE_VERS_ARRET = "passage vers arrêt",
  SUPPRIME = "supprimé",
}

export interface Statut {
  statut: PointDeParcourStatut;
  modificationDeParcours?: ModificationDeParcours;
  motifTransporteur?: MotifTransporteur;
  motifVoyageur?: MotifVoyageur;
}

export interface ModificationDeParcours {
  type: string;
}

export interface MotifTransporteur {
  code: string;
  libelle: string;
}

export interface MotifVoyageur {
  code: string;
  libelle: string;
}

export interface ZoneEmbarquement {
  voieVoyageur?: string;
  dateAffichage?: string;
  statutVoie?: string;
}

export interface Partenaire {
  id: string;
  nom: string;
  dateEnvoi: string;
}

export interface ServiceDeCourse {
  id: string;
}

export interface INotification {
  id: string;
  CourseId: string;
  type: string;
  course: CourseMinimal;
  status: string;
  errors: any[];
  warnings: any[];
}

export interface CourseMinimal {
  id: string;
  date: string;
  numeroCommercial: string;
  mode: string;
  transporteur: IdLabel;
}

export interface ChainageCourseSuivante {
  date: string;
  mode: string;
  idTransporteur: string;
  numeroCommercial: string;
}
