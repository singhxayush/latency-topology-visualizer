export interface Point {
  name: string;
  type: "bot" | "exchange";
  cloudProvider: string;
  location: string;
  lat: number;
  lng: number;
}

export interface Arc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  from: string;
  to: string;
  latencyMs: number;
  fromProvider: string;
  toProvider: string;
}

export interface Exchange {
  name: string;
  cloudProvider: string;
  regionCode: string;
  location: string;
  coords: [number, number];
}

export interface Bot {
  name: string;
  cloudProvider: string;
  regionCode: string;
  location: string;
  coords: [number, number];
}

export interface HistoricalDataPoint {
  timestamp?: number;
  from: string;
  to: string;
  latencyMs: number;
}
