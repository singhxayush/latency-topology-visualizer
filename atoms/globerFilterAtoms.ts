import {atom} from "jotai";
import {
  Bot,
  bots,
  Exchange,
  exchanges,
  PROVIDERS,
} from "@/components/dashboard/globe/globeData";

export const providerAtom = atom<string[]>(PROVIDERS);

export const exchangeAtom = atom<Exchange[]>(exchanges);

export const botAtom = atom<Bot[]>(bots);
