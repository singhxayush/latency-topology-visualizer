export interface LatencyDataPoint {
  timestamp: Date;
  exchangeId: string;
  latency: number;
}

export interface ChartDataPoint {
  time: string;
  [key: string]: string | number; // Dynamic keys for each exchange
}

// Generate historical data for the last 24 hours
export const generateHistoricalData = (exchangeIds: string[]): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const now = new Date();
  
  // Generate data points for every 30 minutes over the last 24 hours
  for (let i = 47; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 30 * 60 * 1000);
    const timeString = timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    
    const dataPoint: ChartDataPoint = {
      time: timeString,
    };
    
    exchangeIds.forEach(exchangeId => {
      // Generate realistic latency patterns
      const baseLatency = getBaseLatencyForExchange(exchangeId);
      const hourOfDay = timestamp.getHours();
      
      // Add some realistic patterns based on time of day
      let multiplier = 1;
      if (hourOfDay >= 8 && hourOfDay <= 18) {
        multiplier = 1.2; // Higher latency during business hours
      } else if (hourOfDay >= 0 && hourOfDay <= 6) {
        multiplier = 0.8; // Lower latency during off-peak hours
      }
      
      const variance = baseLatency * 0.4 * (Math.random() - 0.5);
      dataPoint[exchangeId] = Math.max(1, Math.round(baseLatency * multiplier + variance));
    });
    
    data.push(dataPoint);
  }
  
  return data;
};

const getBaseLatencyForExchange = (exchangeId: string): number => {
  const baseLatencies: Record<string, number> = {
    '1': 12, // Binance
    '2': 8,  // Bybit
    '3': 25, // Coinbase
    '4': 45, // Kraken
    '5': 15, // KuCoin
    '6': 18, // Huobi
  };
  
  return baseLatencies[exchangeId] || 20;
};