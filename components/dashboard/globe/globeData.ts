// --- TYPE DEFINITIONS ---
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

export interface LatencyConnection {
  from: string;
  to: string;
  latencyMs: number;
}
// --- EXCHANGES (added Kraken and KuCoin) ---
export const exchanges: Exchange[] = [
  {
    name: "Binance",
    cloudProvider: "AWS",
    regionCode: "ap-southeast-1",
    location: "Singapore",
    coords: [1.3521, 103.8198],
  },
  {
    name: "Bybit",
    cloudProvider: "Azure",
    regionCode: "germanywestcentral",
    location: "Frankfurt, Germany",
    coords: [50.1109, 8.6821],
  },
  {
    name: "OKX",
    cloudProvider: "GCP",
    regionCode: "asia-northeast1",
    location: "Tokyo, Japan",
    coords: [35.6762, 139.6503],
  },
  {
    name: "Deribit",
    cloudProvider: "AWS",
    regionCode: "eu-west-1",
    location: "Dublin, Ireland",
    coords: [53.3498, -6.2603],
  },
  {
    name: "Kraken",
    cloudProvider: "GCP",
    regionCode: "us-west1",
    location: "San Francisco, USA",
    coords: [37.7749, -122.4194],
  },
  {
    name: "KuCoin",
    cloudProvider: "Azure",
    regionCode: "southeastasia",
    location: "Jakarta, Indonesia",
    coords: [-6.2088, 106.8456],
  },
];

// --- BOTS (added Bot 4 and Bot 5) ---
export const bots: Bot[] = [
  {
    name: "Bot 1",
    cloudProvider: "AWS",
    regionCode: "ap-south-1",
    location: "Mumbai, India",
    coords: [19.076, 72.8777],
  },
  {
    name: "Bot 2",
    cloudProvider: "GCP",
    regionCode: "us-east1",
    location: "N. Virginia, USA",
    coords: [38.8339, -77.1699],
  },
  {
    name: "Bot 3",
    cloudProvider: "Azure",
    regionCode: "australiaeast",
    location: "Sydney, Australia",
    coords: [-33.8688, 151.2093],
  },
  {
    name: "Bot 4",
    cloudProvider: "Azure",
    regionCode: "northeurope",
    location: "Stockholm, Sweden",
    coords: [59.3293, 18.0686],
  },
  {
    name: "Bot 5",
    cloudProvider: "GCP",
    regionCode: "southamerica-east1",
    location: "São Paulo, Brazil",
    coords: [-23.5505, -46.6333],
  },
];

// --- SIMULATED LATENCY (complete matrix with new bots + exchanges) ---
export const simulatedLatencyMatrix: LatencyConnection[] = [
  // Bot 1
  {from: "Bot 1", to: "Binance", latencyMs: 65},
  {from: "Bot 1", to: "Bybit", latencyMs: 148},
  {from: "Bot 1", to: "OKX", latencyMs: 95},
  {from: "Bot 1", to: "Deribit", latencyMs: 130},
  {from: "Bot 1", to: "KuCoin", latencyMs: 55},

  // Bot 2
  {from: "Bot 2", to: "Binance", latencyMs: 195},
  {from: "Bot 2", to: "Bybit", latencyMs: 85},
  {from: "Bot 2", to: "OKX", latencyMs: 130},
  {from: "Bot 2", to: "Deribit", latencyMs: 75},
  {from: "Bot 2", to: "Kraken", latencyMs: 65},

  // Bot 3
  {from: "Bot 3", to: "Binance", latencyMs: 80},
  {from: "Bot 3", to: "KuCoin", latencyMs: 90},

  // Bot 4 (Sweden)
  {from: "Bot 4", to: "Binance", latencyMs: 190},
  {from: "Bot 4", to: "Bybit", latencyMs: 40},
  {from: "Bot 4", to: "Kraken", latencyMs: 140},

  // Bot 5 (Brazil)
  {from: "Bot 5", to: "Binance", latencyMs: 290},
  {from: "Bot 5", to: "Bybit", latencyMs: 320},
  {from: "Bot 5", to: "Kraken", latencyMs: 90},
];

export const PROVIDERS = ["AWS", "GCP", "Azure"];

export const PROVIDER_COLORS: {[key: string]: string} = {
  AWS: "#FF9900",
  GCP: "#4285F4",
  Azure: "#0078D4",
};
