// export interface Exchange {
//   id: string;
//   name: string;
//   region: string;
//   cloudProvider: 'AWS' | 'GCP' | 'Azure';
//   latency: number;
//   status: 'healthy' | 'warning' | 'critical';
//   coordinates: [number, number]; // [lat, lng]
//   lastUpdated: Date;
// }

// export const exchanges: Exchange[] = [
//   {
//     id: '1',
//     name: 'Binance',
//     region: 'Asia-Pacific',
//     cloudProvider: 'AWS',
//     latency: 12,
//     status: 'healthy',
//     coordinates: [35.6762, 139.6503], // Tokyo
//     lastUpdated: new Date(),
//   },
//   {
//     id: '2',
//     name: 'Bybit',
//     region: 'Asia-Pacific',
//     cloudProvider: 'GCP',
//     latency: 8,
//     status: 'healthy',
//     coordinates: [1.3521, 103.8198], // Singapore
//     lastUpdated: new Date(),
//   },
//   {
//     id: '3',
//     name: 'Coinbase',
//     region: 'North America',
//     cloudProvider: 'AWS',
//     latency: 25,
//     status: 'warning',
//     coordinates: [37.7749, -122.4194], // San Francisco
//     lastUpdated: new Date(),
//   },
//   {
//     id: '4',
//     name: 'Kraken',
//     region: 'Europe',
//     cloudProvider: 'Azure',
//     latency: 45,
//     status: 'critical',
//     coordinates: [51.5074, -0.1278], // London
//     lastUpdated: new Date(),
//   },
//   {
//     id: '5',
//     name: 'KuCoin',
//     region: 'Asia-Pacific',
//     cloudProvider: 'AWS',
//     latency: 15,
//     status: 'healthy',
//     coordinates: [22.3193, 114.1694], // Hong Kong
//     lastUpdated: new Date(),
//   },
//   {
//     id: '6',
//     name: 'Huobi',
//     region: 'Asia-Pacific',
//     cloudProvider: 'GCP',
//     latency: 18,
//     status: 'healthy',
//     coordinates: [39.9042, 116.4074], // Beijing
//     lastUpdated: new Date(),
//   },
// ];

// export const generateRandomLatency = (baseLatency: number): number => {
//   const variance = baseLatency * 0.3;
//   return Math.max(1, Math.round(baseLatency + (Math.random() - 0.5) * variance));
// };

// export const getStatusFromLatency = (latency: number): Exchange['status'] => {
//   if (latency <= 20) return 'healthy';
//   if (latency <= 40) return 'warning';
//   return 'critical';
// };