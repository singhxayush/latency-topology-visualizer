/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {useMemo} from "react";
import Globe from "react-globe.gl";
import {countries} from "@/components/dashboard/globe/countries";
import {
  PROVIDER_COLORS,
  simulatedLatencyMatrix,
  type Arc,
  type Point,
} from "@/components/dashboard/globe/globeData";
import {
  getArcAnimateDelay,
  getLatencyColor,
} from "@/components/dashboard/globe/globeUtils";
import {useAtom} from "jotai";
import {botAtom, exchangeAtom, providerAtom} from "@/atoms/globerFilterAtoms";
import Legend from "./globe/globeLegend";

// --- MAIN APP COMPONENT ---
const ThreeGlobe = () => {
  const [selectedProviders] = useAtom(providerAtom);
  const [selectedExchange] = useAtom(exchangeAtom);
  const [selectedBot] = useAtom(botAtom);

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
  }, [selectedProviders, selectedExchange, selectedBot]);

  return (
    <div className="relative w-full max-h-[calc(100vh-82px)] bg-black text-white font-sans flex items-center justify-center">
      <div className="absolute bottom-0 left-0 z-10">
        <Legend />
      </div>

      <div>
        <Globe
          globeImageUrl="/globe3.png"
          backgroundImageUrl="/night.png"
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
          <div class="bg-gray-800 text-white p-3 rounded-lg shadow-lg border border-gray-600">
          <div class="font-bold text-lg mb-1" style="color: ${
            point.type === "bot" ? "#67e8f9" : "#f0abfc"
          };">${point.name} (${point.type})</div>
            <div class="text-sm text-gray-300">${point.location}</div>
            <div class="text-sm text-gray-400" style="color: ${
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
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={(arc: any) => getArcAnimateDelay(arc.latencyMs)}
          arcLabel={(arc: any) => `
                <div class="bg-gray-800 text-white p-3 rounded-lg shadow-lg border border-gray-600">
                <div class="font-bold text-md mb-1">${arc.from} ➔ ${
            arc.to
          }</div>
                <div class="text-sm">
                <span class="font-semibold" style="color: ${getLatencyColor(
                  arc.latencyMs
                )};">
                Latency: ${arc.latencyMs} ms
                </span>
                </div>
                <div class="text-xs text-gray-400 mt-1">
                <span style="color: ${PROVIDER_COLORS[arc.fromProvider]};">${
            arc.fromProvider
          }</span> to 
                  <span style="color: ${PROVIDER_COLORS[arc.toProvider]};">${
            arc.toProvider
          }</span>
                    </div>
                    </div>
                    `}
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
