"use client";

import {useMemo, useState} from "react";
import {LatencyStatsPanel} from "./LatencyStatsPanel";
import {
  exchanges as initialExchanges,
  generateRandomLatency,
  getStatusFromLatency,
} from "@/data/exchanges";

const Dashboard = () => {
  const [exchanges, setExchanges] = useState(initialExchanges);

  const [filters, setFilters] = useState<FilterState>({
    showHealthy: true,
    showWarning: true,
    showCritical: true,
    selectedRegions: [],
    selectedProviders: [],
    latencyThreshold: "All",
    autoRefresh: true,
  });

  const filteredExchanges = useMemo(() => {
    return exchanges.filter((exchange) => {
      // Status filter
      if (!filters.showHealthy && exchange.status === "healthy") return false;
      if (!filters.showWarning && exchange.status === "warning") return false;
      if (!filters.showCritical && exchange.status === "critical") return false;

      // Region filter
      if (
        filters.selectedRegions.length > 0 &&
        !filters.selectedRegions.includes(exchange.region)
      ) {
        return false;
      }

      // Provider filter
      if (
        filters.selectedProviders.length > 0 &&
        !filters.selectedProviders.includes(exchange.cloudProvider)
      ) {
        return false;
      }

      // Latency threshold filter
      if (filters.latencyThreshold !== "All") {
        const threshold = parseInt(filters.latencyThreshold.replace("ms", ""));
        if (exchange.latency > threshold) return false;
      }

      return true;
    });
  }, [exchanges, filters]);

  return (
    <div>
      <LatencyStatsPanel exchanges={filteredExchanges} />
    </div>
  );
};

export default Dashboard;
