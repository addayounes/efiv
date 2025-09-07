export interface CreateCirculationDto {
  destination?: string;
  origine?: string;
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
}
