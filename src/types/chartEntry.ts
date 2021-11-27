type ChartType = "Bar" | "Pie";

export interface ChartEntry {
  type: ChartType;
  elements: number[];
}
