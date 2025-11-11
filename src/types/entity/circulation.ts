export interface ICirculation {
  course: ICirculationCourse;
  notifications: INotification[];
}

export interface ICirculationCourse {
  date: string;
  destination: Destination;
  origine: Origine;
  marqueCommerciale: MarqueCommerciale;
  mode: string;
  numeroCommercial: string;
  parcours: Parcours;
  partenaire: Partenaire;
  serviceDeCourse: ServiceDeCourse[];
  sousMode: string;
  statut: string;
  transporteur: Transporteur;
  id: string;
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

export interface MarqueCommerciale {
  id: string;
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
}

export interface Arret {
  arrivee: ArriveeDepart;
  depart: ArriveeDepart;
  descenteInterdite: boolean;
  monteeInterdite: boolean;
}

export interface ArriveeDepart {
  horaire: string;
  suppressionDiffusable: boolean;
  retardReel?: number;
  retardVoyageur?: number;
}

export interface Desserte {
  codeUIC: string;
  libelle12: string;
  libelle23: string;
}

export interface Statut {
  statut: string;
}

// TODO
export interface ZoneEmbarquement {}

export interface Partenaire {
  id: string;
  nom: string;
  dateEnvoi: string;
}

export interface ServiceDeCourse {
  id: string;
}

export interface Transporteur {
  id: string;
  libelle: string;
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
  transporteur: Transporteur;
}
