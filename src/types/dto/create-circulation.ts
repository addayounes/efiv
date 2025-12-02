interface ISelectOption {
  label: string;
  value: string;
  title: string;
}

export interface CreateCirculationDto extends CreateCirculationAddOnsDto {
  date?: string;
  destination?: ISelectOption;
  origine?: ISelectOption;
  marqueCommerciale?: string;
  nomCommercial?: string;
  numeroCommercial?: string;
  ligneCommerciale?: string;
  mode?: string;
  sousMode?: string;
  longueur?: string;
  courseSpeciale?: boolean;
  libelleCourseSpeciale?: string;
  videVoyageur?: boolean;
  serviceDeCourse?: string[];

  compositionId: string;

  parcours: ParcoursDto[];
  informationsConjoncturelles: InformationsConjoncturelleDto[];
}

export interface ParcoursDto {
  station?: ISelectOption;
  voieTransporteur?: string;
  monteeInterdite?: boolean;
  descenteInterdite?: boolean;
  inversionComposition?: boolean;
  arrivee?: ArrivalOrDepartureDto;
  depart?: ArrivalOrDepartureDto;
  informationsConjoncturelles?: InformationsConjoncturelleDto[];
}

export interface ArrivalOrDepartureDto {
  horaire?: string;
  numeroSillon?: string;
  couplageId?: string;
}

export interface InformationsConjoncturelleDto {
  categorie: string;
  typeInformation: string;
  texte: string;
  dateHeureDebutPublication: string;
  dateHeureFinPublication?: string;
}

export interface CreateCirculationAddOnsDto {
  dateType?: string;
  startDate?: string;
  endDate?: string;
}

//

export interface CreateCirculationApiPayload {
  id: string;
  date: string;
  destination: Desserte;
  destinationInitiale?: string;
  ligneCommerciale?: IdLabel;
  longueur?: string;
  marqueCommerciale?: IdLabel;
  mode: string;
  nomCommercial?: string;
  numeroCommercial: string;
  origine: Desserte;
  origineInitiale?: string;
  parcours: Parcours;
  partenaire: Partenaire;
  serviceDeCourse?: ServiceDeCourse[];
  sousMode?: string;
  statut?: string;
  transporteur: IdLabel;
  speciale?: Speciale;
  informationsConjoncturelles?: InformationsConjoncturelle[];
  videVoyageur?: boolean;
  chainageCourseSuivante?: ChainageCourseSuivante;
}

export interface Parcours {
  pointDeParcours: PointDeParcour[];
}

export interface PointDeParcour {
  arret: Arret;
  desserte: Desserte;
  rang: number;
  statuts: Statut[];
  zoneEmbarquement?: ZoneEmbarquement;
  informationsConjoncturelles?: InformationsConjoncturelle[];
  libelleBusRemplacement?: string;
}

export interface Arret {
  arrivee?: ArriveeDepart;
  depart?: ArriveeDepart;
  descenteInterdite?: boolean;
  monteeInterdite?: boolean;
}

export interface ArriveeDepart {
  composition?: Composition;
  horaire: string;
  courseMenante?: CourseMenante;
  courseMenee?: CourseMenee;
  listeEmplacementsITL?: Desserte[];
  motifTransporteurAsync?: CodeLabel;
  motifVoyageur?: CodeLabel;
  numeroSillon?: string;
  retardReel?: number;
  retardVoyageur?: number;
  suppressionDiffusable?: boolean;
  mentionDirect?: boolean;
  mentionVia?: boolean;
}

export interface CreateComposition {
  name: string;
  materielRoulant: MaterielRoulant[];
}

export interface Composition {
  materielRoulant: MaterielRoulant[];
}

export interface MaterielRoulant {
  elementMaterielRoulant: ElementMaterielRoulantAsync[];
  serie: string;
  sousSerie: string;
  sousSerie2: string;
}

export enum ElementMaterielRoulantType {
  Vehicle = "voiture",
  Head = "tête",
  Tail = "queue",
}

export interface ElementMaterielRoulantAsync {
  type: ElementMaterielRoulantType;
  libelle?: string;
  longueur: number;
  porte: Porte[];
}

export interface Porte {
  position: number;
}

export interface CourseMenante {
  date: string;
  idTransporteur: string;
  mode: string;
  numeroCommercial: string;
}

export interface CourseMenee {
  date: string;
  idTransporteur?: string;
  mode: string;
  numeroCommercial: string;
}

export interface Desserte {
  codeUIC: string;
  libelle12?: string;
  libelle23?: string;
}

export interface Statut {
  modificationDeParcours: ModificationDeParcours;
  motifTransporteur: CodeLabel;
  motifVoyageur: CodeLabel;
  statut: string;
}

export interface ModificationDeParcours {
  type: string;
}

export interface ZoneEmbarquement {
  voieTransporteur?: string;
}

export interface InformationsConjoncturelle {
  identifiantTransporteur?: string;
  typeInformation: string;
  categorie: string;
  titre?: string;
  texte: string;
  dateHeureDebutPublication: string;
  dateHeureFinPublication?: string;
}

export interface Partenaire {
  id: string;
  nom: string;
  dateEnvoi?: string;
}

export interface ServiceDeCourse {
  id: string;
}

export interface Speciale {
  courseSpeciale?: boolean;
  libelleCourseSpeciale?: string;
}

export interface ChainageCourseSuivante {
  date: string;
  idTransporteur?: string;
  mode: string;
  numeroCommercial: string;
}

export interface CodeLabel {
  code: string;
  libelle?: string;
}

export interface IdLabel {
  id: string;
  libelle?: string;
}
