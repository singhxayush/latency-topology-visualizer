"use client";

import React, {useState, useEffect, useMemo} from "react";
import {useAtom} from "jotai";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {ArrowBigRight, BarChart2} from "lucide-react";
import {botAtom} from "@/atoms/globerFilterAtoms";
import {
  bots,
  HistoricalDataPoint,
  simulatedLatencyMatrix,
} from "../globe/globe-data";
import {historicalLatencyAtom} from "@/atoms/dashboardAtoms";
import {
  exportToCsv,
  formatTimestamp,
  generateInitialHistory,
} from "@/lib/analytics-utils";
import {Tabs} from "./time-duration-tabs";
import {timeRanges} from "./analytics-data";
import {ExportDropdown} from "./export-csv-dropdown";
import {BotExchangeDropdown} from "./bot-exchange-dropdown";
import {CustomTooltip} from "./custom-tooltip";
import StatsUi from "./stats-ui";

const LatencyHistorySimulation = () => {
  const [historicalData, setHistoricalData] = useAtom(historicalLatencyAtom);
  const [selectedBotsGlobal] = useAtom(botAtom);
  const [selectedBot, setSelectedBot] = useState<string>(bots[0]?.name || "");

  const [availableExchanges, setAvailableExchanges] = useState<string[]>([]);
  const [selectedExchange, setSelectedExchange] = useState<string>("");
  const [activeTimeRange, setActiveTimeRange] = useState("24H");

  // DATA INITIALIZATION & REAL-TIME (5 SEC) UPDATES
  useEffect(() => {
    if (historicalData.length === 0) {
      setHistoricalData(generateInitialHistory());
    }

    const intervalId = setInterval(() => {
      const newData: HistoricalDataPoint[] = simulatedLatencyMatrix.map(
        (conn) => {
          const jitter = (Math.random() - 0.5) * (conn.latencyMs * 0.2);
          return {
            timestamp: Date.now(),
            from: conn.from,
            to: conn.to,
            latencyMs: Math.round(conn.latencyMs + jitter),
          };
        }
      );

      setHistoricalData((prevData) => [...prevData, ...newData]);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [setHistoricalData, historicalData.length]);

  // UPDATE AVAILABLE EXCHANGES WHEN BOT CHANGES
  useEffect(() => {
    const connectedExchanges = simulatedLatencyMatrix
      .filter((conn) => conn.from === selectedBot)
      .map((conn) => conn.to);

    setAvailableExchanges(connectedExchanges);
    if (!connectedExchanges.includes(selectedExchange)) {
      setSelectedExchange(connectedExchanges[0] || "");
    }
  }, [selectedBot, selectedExchange]);

  // MEMO: FILTER DATA FOR CHART
  const {chartData, stats} = useMemo(() => {
    if (!selectedBot || !selectedExchange)
      return {chartData: [], stats: {min: 0, max: 0, avg: 0}};
    const timeRangeMs =
      timeRanges.find((tr) => tr.label === activeTimeRange)?.value || 0;
    const cutoffTimestamp = Date.now() - timeRangeMs;
    const filtered = historicalData.filter(
      (d) =>
        d.from === selectedBot &&
        d.to === selectedExchange &&
        d.timestamp! >= cutoffTimestamp
    );
    if (filtered.length === 0)
      return {chartData: [], stats: {min: 0, max: 0, avg: 0}};
    const latencies = filtered.map((d) => d.latencyMs);
    const newStats = {
      min: Math.min(...latencies),
      max: Math.max(...latencies),
      avg: Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length),
    };
    return {chartData: filtered, stats: newStats};
  }, [historicalData, selectedBot, selectedExchange, activeTimeRange]);

  // EXPORT HANDLER
  const handleExport = (timeRangeLabel: string) => {
    if (!selectedBot || !selectedExchange) {
      alert("Please select a Bot and an Exchange first.");
      return;
    }

    const timeRangeMs =
      timeRanges.find((tr) => tr.label === timeRangeLabel)?.value || 0;
    const cutoffTimestamp = Date.now() - timeRangeMs;

    const dataToExport = historicalData.filter(
      (d) =>
        d.from === selectedBot &&
        d.to === selectedExchange &&
        d.timestamp! >= cutoffTimestamp
    );

    const filename = `latency_export_${selectedBot}_to_${selectedExchange}_${timeRangeLabel}.csv`;
    exportToCsv(dataToExport, filename);
  };

  return (
    <div className="w-full flex flex-col gap-2 overscroll-auto">
      {/* Header */}
      <h2 className="text-2xl font-bold flex items-center gap-2 my-4">
        <BarChart2 className="text-lime-300 stroke-4" />
        Historical Latency
      </h2>

      {/* Filters - Menus - Export Options */}
      <div className="flex flex-wrap gap-2 md:gap-2 items-center w-full justify-between">
        <Tabs
          items={timeRanges}
          active={activeTimeRange}
          setActive={setActiveTimeRange}
        />

        <span className="flex items-center gap-2 flex-wrap">
          <span className="flex flex-nowrap items-center gap-1">
            <BotExchangeDropdown
              placeholder="Select Bot"
              value={selectedBot}
              onChange={(e) => setSelectedBot(e.target.value)}
              options={selectedBotsGlobal.map((b) => ({
                value: b.name,
                label: b.name,
              }))}
            />

            <ArrowBigRight className="stroke-[1.5] size-4" />

            <BotExchangeDropdown
              placeholder="Select Exchange"
              value={selectedExchange}
              onChange={(e) => setSelectedExchange(e.target.value)}
              options={availableExchanges.map((ex) => ({value: ex, label: ex}))}
            />
          </span>
          <ExportDropdown onExport={handleExport} />
        </span>
      </div>

      {/* Stats Area */}
      <StatsUi stats={stats} />

      {/* Chart Area */}
      <div className="h-[30rem] w-full bg-neutral-50/50 dark:bg-neutral-950/50 border border-neutral-300 dark:border-neutral-800 p-4 rounded-lg">
        {chartData.length > 0 ? (
          <div className="w-full h-full overflow-x-auto">
            <div className="min-w-[60rem] h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{top: 0, right: 10, left: -20, bottom: 20}}
                >
                  <CartesianGrid strokeDasharray="4 4" stroke="#404040" />
                  <XAxis
                    className="text-xs"
                    dataKey="timestamp"
                    tickFormatter={(ts) =>
                      formatTimestamp(
                        ts,
                        timeRanges.find((tr) => tr.label === activeTimeRange)
                          ?.value || 0
                      )
                    }
                    fontSize={12}
                    label={{
                      value: "Time (ms)",
                      position: "insideBottom",
                      dy: 20,
                      style: {
                        fill: "#a1a1aa",
                        fontSize: 12,
                      },
                    }}
                  />
                  <YAxis
                    className="text-xs"
                    fontSize={12}
                    domain={["dataMin - 10", "dataMax + 10"]}
                    label={{
                      value: "Latency (ms)",
                      position: "center",
                      dx: -4,
                      angle: -90,
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="stepAfter"
                    dataKey="latencyMs"
                    name="Latency"
                    stroke="#a3e635"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 items-center justify-center h-full font-thin text-neutral-400">
            <p>
              No data available for this selection. Please select a valid Bot
              and Exchange.
            </p>
            <p>
              In case everything is correct, please wait for some data to be
              initialised.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatencyHistorySimulation;
