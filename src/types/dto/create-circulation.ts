export interface CreateCirculationDto extends CreateCirculationAddOnsDto {
  date?: string;
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

  parcours: any[];
}

export interface CreateCirculationAddOnsDto {
  dateType?: string;
  startDate?: string;
  endDate?: string;
}
