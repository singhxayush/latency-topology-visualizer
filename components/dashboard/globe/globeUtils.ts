interface FetchResult {
  success: boolean;
  data?: ArrayBuffer;
}

export const fetchData = async (): Promise<FetchResult> => {
  try {
    const response = await fetch("/datasets/worldcities.xlsx");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return {success: true, data: arrayBuffer};
  } catch (error) {
    console.error("Failed to fetch globe data:", error);
    return {success: false};
  }
};

export const getLatencyColor = (latency: number): string => {
  if (latency < 100) return "#4ade80";
  if (latency < 150) return "#facc15";
  return "#f87171";
};

export const getArcAnimateDelay = (latency: number): number => {
  if (latency < 100) return 1000;
  if (latency < 150) return 4000;
  return 6000;
};
