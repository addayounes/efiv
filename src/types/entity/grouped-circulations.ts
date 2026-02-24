import type { ICirculation } from "./circulation";

export type RawGroupedCirculation = Record<string, ICirculation[]>;

export interface GroupedCirculation {
  numeroCommercial: string;
  circulations: ICirculation[];
}
