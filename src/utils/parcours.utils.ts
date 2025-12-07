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
    if (!s.isDeleted && s.codeUIC !== forbidUIC) return i;
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
    if (!s.isDeleted && s.codeUIC !== forbidUIC) return i;
  }
  return null;
}
