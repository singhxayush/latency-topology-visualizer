"use client";

import dynamic from "next/dynamic";
import LatencyStatsPanel from "./LatencyStatsPanel";

const ThreeGlobe = dynamic(() => import("@/components/dashboard/ThreeGlobe"), {
  ssr: false,
  loading: () => (
    <div className="text-white p-4 min-h-[calc(100vh-82px)] flex items-center justify-center bg-neutral-900 z-20">
      Loading globe...
    </div>
  ),
});

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden border border-neutral-800 rounded-2xl shadow-black/20 shadow-lg">
        <ThreeGlobe />
      </div>

      <div className="overflow-hidden rounded-2xl">
        <LatencyStatsPanel />
      </div>
    </div>
  );
};

export default Dashboard;
