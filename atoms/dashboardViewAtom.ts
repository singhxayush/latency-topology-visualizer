import {atom} from "jotai";

export type DashboardView = "globe" | "analytics";

export const dashboardViewAtom = atom<DashboardView>("globe");
