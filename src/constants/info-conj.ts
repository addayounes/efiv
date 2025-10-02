export enum InfoConjType {
  Gare = "GARE",
  Quai = "QUAI",
}

export const TypeStatusLabelMap: Record<InfoConjType, string> = {
  [InfoConjType.Gare]: "Gare",
  [InfoConjType.Quai]: "Quai",
};

export const INFO_CONJ_TYPE_OPTIONS = Object.values(InfoConjType).map(
  (status) => ({
    label: TypeStatusLabelMap[status],
    value: status,
  })
);

export enum InfoConjCategory {
  Perturbation = "PERTURBATION",
  Alerte = "ALERTE",
  Travaux = "TRAVAUX",
  Information = "INFORMATION",
}

export const CategoryStatusLabelMap: Record<InfoConjCategory, string> = {
  [InfoConjCategory.Perturbation]: "Perturbation",
  [InfoConjCategory.Alerte]: "Alerte",
  [InfoConjCategory.Travaux]: "Travaux",
  [InfoConjCategory.Information]: "Information",
};

export const INFO_CONJ_CATEGORY_OPTIONS = Object.values(InfoConjCategory).map(
  (status) => ({
    label: CategoryStatusLabelMap[status],
    value: status,
  })
);
