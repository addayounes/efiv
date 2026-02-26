import type {
  GroupedCirculation,
  RawGroupedCirculation,
} from "@/types/entity/grouped-circulations";

export const mapRawGroupedCirculationsToGroupedCirculations = (
  raw: RawGroupedCirculation[],
): GroupedCirculation[] =>
  raw.map((item) => {
    return Object.entries(item).reduce((acc, [key, value]) => {
      acc.push({ circulations: value, numeroCommercial: key });
      return acc;
    }, [] as GroupedCirculation[])[0];
  });
