"use client";

import {useAtom} from "jotai";
import dynamic from "next/dynamic";
import LatencyStatsPanel from "./AnalyticsPanel";
import {dashboardViewAtom} from "@/atoms/dashboardViewAtom";

const ThreeGlobe = dynamic(() => import("@/components/dashboard/ThreeGlobe"), {
  ssr: false,
  loading: () => (
    <div className="text-white min-h-[calc(100vh-82px)] flex items-center justify-center bg-neutral-900 z-20">
      Loading globe...
    </div>
  ),
});

const Dashboard = () => {
  const [view] = useAtom(dashboardViewAtom);

  return (
    <div>
      {view === "globe" ? (
        <div className="overflow-hidden border border-neutral-900 rounded-2xl">
          <ThreeGlobe />
        </div>
      ) : (
        <div className="overflow-hidden border border-neutral-900 rounded-2xl">
          <LatencyStatsPanel />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
