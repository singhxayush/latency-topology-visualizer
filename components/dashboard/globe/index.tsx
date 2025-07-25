/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {useMemo} from "react";
import Globe from "react-globe.gl";
import {countries} from "@/components/dashboard/globe/countries";
import {
  PROVIDER_COLORS,
  // simulatedLatencyMatrix,
  type Arc,
  type Point,
} from "@/components/dashboard/globe/globe-data";
import {
  getArcAnimateDelay,
  getLatencyColor,
} from "@/components/dashboard/globe/globe-utils";
import {useAtom} from "jotai";
import {botAtom, exchangeAtom, providerAtom} from "@/atoms/globerFilterAtoms";
import Legend from "./globe-legend";
import {realtimeLatencyDataAtom} from "@/atoms/dashboardAtoms";

// MAIN APP COMPONENT
const ThreeGlobe = () => {
  const [selectedProviders] = useAtom(providerAtom);
  const [selectedExchange] = useAtom(exchangeAtom);
  const [selectedBot] = useAtom(botAtom);
  const [simulatedLatencyMatrix] = useAtom(realtimeLatencyDataAtom);

  const {points, arcs} = useMemo(() => {
    const allPointsMap = new Map<string, Point>();

    selectedBot.forEach((b) =>
      allPointsMap.set(b.name, {
        ...b,
        type: "bot",
        lat: b.coords[0],
        lng: b.coords[1],
      })
    );

    selectedExchange.forEach((e) =>
      allPointsMap.set(e.name, {
        ...e,
        type: "exchange",
        lat: e.coords[0],
        lng: e.coords[1],
      })
    );

    const filteredPoints = Array.from(allPointsMap.values()).filter((p) =>
      selectedProviders.includes(p.cloudProvider)
    );

    const filteredPointNames = new Set(filteredPoints.map((p) => p.name));

    const visibleArcs: Arc[] = simulatedLatencyMatrix
      .map((conn) => {
        const fromPoint = allPointsMap.get(conn.from);
        const toPoint = allPointsMap.get(conn.to);
        if (!fromPoint || !toPoint) return null;
        return {
          startLat: fromPoint.lat,
          startLng: fromPoint.lng,
          endLat: toPoint.lat,
          endLng: toPoint.lng,
          from: fromPoint.name,
          to: toPoint.name,
          latencyMs: conn.latencyMs,
          fromProvider: fromPoint.cloudProvider,
          toProvider: toPoint.cloudProvider,
        };
      })
      .filter(
        (arc): arc is Arc =>
          arc !== null &&
          filteredPointNames.has(arc.from) &&
          filteredPointNames.has(arc.to)
      );

    return {points: filteredPoints, arcs: visibleArcs};
  }, [
    selectedProviders,
    selectedExchange,
    selectedBot,
    simulatedLatencyMatrix,
  ]);

  return (
    <div className="relative w-full text-white flex items-center justify-center">
      <div className="absolute w-full sm:w-[10rem] left-0 p-1 bottom-12 md:top-1 md:-left-4 z-10">
        <Legend />
      </div>

      <div>
        <Globe
          backgroundColor="rgba(19, 19, 19, 0)"
          // Points (Bots & Exchanges)
          pointsData={points}
          pointLat="lat"
          pointLng="lng"
          pointAltitude={0.01}
          pointRadius={1}
          pointColor={(point: any) =>
            point.type === "bot" ? "cyan" : "fuchsia"
          }
          pointLabel={(point: any) => `
          <div class="bg-zinc-800 text-white p-3 rounded-lg shadow-lg border border-zinc-600">
          <div class="font-bold text-lg mb-1" style="color: ${
            point.type === "bot" ? "#67e8f9" : "#f0abfc"
          };">${point.name} (${point.type})</div>
            <div class="text-sm text-zinc-300">${point.location}</div>
            <div class="text-sm text-zinc-400" style="color: ${
              PROVIDER_COLORS[point.cloudProvider]
            };">Provider: ${point.cloudProvider}</div>
              </div>
              `}
          // Arcs (Latency Connections)
          arcsData={arcs}
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor={(arc: any) => getLatencyColor(arc.latencyMs)}
          arcStroke={1}
          arcDashLength={1.5}
          arcDashGap={0.5}
          arcDashAnimateTime={(arc: any) => getArcAnimateDelay(arc.latencyMs)}
          arcLabel={(arc: any) => `
                <div class="bg-zinc-800 text-white p-2 rounded-lg shadow-lg border border-zinc-600">
                  <div class="font-bold text-md mb-1">
                    ${arc.from} ➔ ${arc.to}
                  </div>
                <div class="text-sm">
                  <span class="font-semibold" style="color: ${getLatencyColor(
                    arc.latencyMs
                  )};">
                    Latency: ${arc.latencyMs} ms
                  </span>
                </div>
                  <div class="text-xs text-zinc-400 mt-1">
                    <span style="color: ${PROVIDER_COLORS[arc.fromProvider]};">
                      ${arc.fromProvider}
                    </span> 
                    to 
                    <span style="color: ${PROVIDER_COLORS[arc.toProvider]};">
                      ${arc.toProvider}
                    </span>
                  </div>
                </div>
              `}
          arcDashInitialGap={1}
          // arcAltitudeAutoScale={0.5}
          // Poligon Spread
          hexPolygonsData={countries.features}
          hexPolygonResolution={3}
          hexPolygonMargin={0.7}
          hexPolygonColor={() => "rgba(255,255,255, 1)"}
          showAtmosphere={false}
        />
      </div>
    </div>
  );
};

export default ThreeGlobe;
