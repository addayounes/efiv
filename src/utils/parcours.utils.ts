import {
  ParcoursStatus,
  getParcoursStatusConfig,
} from "@/constants/parcours-status";
import {
  type Parcours,
  PointDeParcourStatut,
} from "@/types/entity/circulation";

export interface GenericStop {
  isDeleted: boolean;
  codeUIC: string;
}

// helper: find first non-deleted stop going forward
export function findNextNonDeleted(
  stops: GenericStop[],
  start: number,
  forbidUIC?: string
) {
  for (let i = start; i < stops.length; i++) {
    const s = stops[i];
    if (!s.isDeleted && (s.codeUIC !== forbidUIC || !forbidUIC)) return i;
  }
  return null;
}

// helper: find first non-deleted stop going backward
export function findPrevNonDeleted(
  stops: GenericStop[],
  start: number,
  forbidUIC?: string
) {
  for (let i = start; i >= 0; i--) {
    const s = stops[i];
    if (!s.isDeleted && (s.codeUIC !== forbidUIC || !forbidUIC)) return i;
  }
  return null;
}

export const getParcoursStatuses = (parcours: Parcours) => {
  const statuses = [];
  if (
    parcours.pointDeParcours?.some(
      (pdp) =>
        (pdp?.arret?.arrivee?.retardVoyageur &&
          pdp?.arret?.arrivee?.retardVoyageur > 0) ||
        (pdp?.arret?.depart?.retardVoyageur &&
          pdp?.arret?.depart?.retardVoyageur > 0)
    )
  )
    statuses.push(getParcoursStatusConfig(ParcoursStatus.DELAY));

  if (
    parcours.pointDeParcours?.some((pdp) =>
      pdp.statuts.some((s) => s.statut === PointDeParcourStatut.SUPPRIME)
    )
  )
    statuses.push(getParcoursStatusConfig(ParcoursStatus.STOP_DELETED));

  if (
    parcours.pointDeParcours?.some((pdp) =>
      pdp.statuts.some((s) => s.statut === PointDeParcourStatut.AJOUTE)
    )
  )
    statuses.push(getParcoursStatusConfig(ParcoursStatus.STOP_ADDED));

  return statuses;
};
