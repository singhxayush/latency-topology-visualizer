import {
  HistoricalDataPoint,
  simulatedLatencyMatrix,
} from "@/components/dashboard/globe/globe-data";

export const generateInitialHistory = (): HistoricalDataPoint[] => {
  console.log(
    "Generating initial 30-day historical data with variable intervals..."
  );
  const history: HistoricalDataPoint[] = [];
  const now = Date.now();

  const oneHour = 60 * 60 * 1000;
  const oneDay = 24 * oneHour;
  const sevenDays = 7 * oneDay;
  const thirtyDays = 30 * oneDay;

  const generateDataForPeriod = (
    startTime: number,
    endTime: number,
    intervalMs: number
  ) => {
    for (let time = startTime; time < endTime; time += intervalMs) {
      simulatedLatencyMatrix.forEach((conn) => {
        // Add some random variance to make the data look more realistic
        const jitter = (Math.random() - 0.5) * (conn.latencyMs * 0.25);
        history.push({
          timestamp: time,
          from: conn.from,
          to: conn.to,
          latencyMs: Math.round(conn.latencyMs + jitter),
        });
      });
    }
  };

  // Generate data in chunks, from oldest to newest

  // 1. Data from 30 days ago up to 7 days ago (interval: 6 hours)
  generateDataForPeriod(now - thirtyDays, now - sevenDays, 6 * oneHour);

  // 2. Data from 7 days ago up to 24 hours ago (interval: 2 hours)
  generateDataForPeriod(now - sevenDays, now - oneDay, 2 * oneHour);

  // 3. Data from 24 hours ago up to 1 hour ago (interval: 30 minutes)
  generateDataForPeriod(now - oneDay, now - oneHour, 30 * 60 * 1000);

  // 4. Data for the last hour (interval: 5 minutes)
  generateDataForPeriod(now - oneHour, now, 5 * 60 * 1000);

  history.sort((a, b) => (a.timestamp ?? 0) - (b.timestamp ?? 0));

  return history;
};

export const formatTimestamp = (timestamp: number, range: number) => {
  const date = new Date(timestamp);
  if (range <= 24 * 3600 * 1000) {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
  return date.toLocaleDateString("en-US", {month: "short", day: "numeric"});
};

export const exportToCsv = (data: HistoricalDataPoint[], filename: string) => {
  if (data.length === 0) {
    alert("No data available to export.");
    return;
  }
  const headers = "timestamp,datetime_iso,from,to,latency_ms\n";
  const rows = data
    .map(
      (d) =>
        `${d.timestamp},${new Date(d.timestamp!).toISOString()},${d.from},${
          d.to
        },${d.latencyMs}`
    )
    .join("\n");

  const csvString = `${headers}${rows}`;
  const blob = new Blob([csvString], {type: "text/csv;charset=utf-8;"});
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
