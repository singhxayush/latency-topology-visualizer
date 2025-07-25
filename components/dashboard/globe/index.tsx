/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {useEffect, useMemo, useRef} from "react";
import Globe from "react-globe.gl";
import {countries} from "@/components/dashboard/globe/countries";
import {
  PROVIDER_COLORS,
  // simulatedLatencyMatrix,
  type Arc,
  type Point,
} from "@/components/dashboard/globe/globe-data";
import {getArcAnimateDelay, getLatencyColor} from "@/lib/globe-utils";
import {useAtom} from "jotai";
import {
  botAtom,
  exchangeAtom,
  globeAutoRotateAtom,
  providerAtom,
} from "@/atoms/globerFilterAtoms";
import Legend from "./globe-legend";
import {realtimeLatencyDataAtom} from "@/atoms/dashboardAtoms";
import {useIsMobile} from "@/hooks/use-mobile";
import {Checkbox} from "@radix-ui/react-checkbox";
import {cn} from "@/lib/utils";

// MAIN APP COMPONENT
const ThreeGlobe = () => {
  const [selectedProviders] = useAtom(providerAtom);
  const [selectedExchange] = useAtom(exchangeAtom);
  const [selectedBot] = useAtom(botAtom);
  const [simulatedLatencyMatrix] = useAtom(realtimeLatencyDataAtom);
  const globeRef = useRef<any>(null);

  const [autoRotate, setAutoRotate] = useAtom(globeAutoRotateAtom);

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

  const isMobile = useIsMobile();

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = autoRotate;
      globeRef.current.pointOfView({altitude: isMobile ? 3.5 : 2}, 1000); // lower = zoom in
    }
  }, [isMobile, autoRotate]);

  return (
    <div className="relative w-full text-white flex items-center justify-center">
      <div className="absolute w-full sm:w-[10rem] left-0 p-1 bottom-12 md:top-1 md:-left-4 z-10">
        <Legend />
      </div>

      <div className="absolute z-50 right-0 top-2">
        <label
          htmlFor="auto-rotate"
          className="flex items-center gap-3 cursor-pointer group"
        >
          <span className="text-sm text-neutral-700 dark:text-neutral-300 group-hover:text-cyan-400 transition-colors">
            AUTO ROTATE
          </span>
          <Checkbox
            id="auto-rotate"
            checked={autoRotate}
            aria-label="Toggle auto rotate"
            onCheckedChange={(checked) => setAutoRotate(!!checked)}
            className={cn(
              "cursor-pointer border-2 size-4 rounded transition-colors",
              "border-neutral-500 dark:border-neutral-700",
              autoRotate && "bg-cyan-500 border-cyan-400",
              !autoRotate && "bg-white dark:bg-neutral-950",
              "text-neutral-900 dark:text-white"
            )}
          />
        </label>
      </div>

      <div>
        <Globe
          ref={globeRef}
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
