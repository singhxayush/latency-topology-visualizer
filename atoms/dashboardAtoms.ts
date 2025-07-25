import {
  HistoricalDataPoint,
  simulatedLatencyMatrix,
} from "@/components/dashboard/globe/globe-data";
import {atom} from "jotai";

export type DashboardView = "globe" | "analytics";

export const dashboardViewAtom = atom<DashboardView>("analytics");

export const historicalLatencyAtom = atom<HistoricalDataPoint[]>([]);

export const realtimeLatencyDataAtom = atom<HistoricalDataPoint[]>(
  simulatedLatencyMatrix
);
