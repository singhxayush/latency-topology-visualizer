import {HistoricalDataPoint, simulatedLatencyMatrix} from "../globe/globe-data";

export const generateInitialHistory = (): HistoricalDataPoint[] => {
  console.log("Generating initial 30-day historical data...");
  const history: HistoricalDataPoint[] = [];
  const now = Date.now();
  const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

  simulatedLatencyMatrix.forEach((conn) => {
    // Generate a data point roughly every hour for the last 30 days
    for (let i = 0; i < 30 * 24; i++) {
      const timestamp = now - thirtyDaysInMs + i * 60 * 60 * 1000;
      const jitter = (Math.random() - 0.5) * (conn.latencyMs * 0.2); // +/- 10% variance
      history.push({
        timestamp,
        from: conn.from,
        to: conn.to,
        latencyMs: Math.round(conn.latencyMs + jitter),
      });
    }
  });
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
