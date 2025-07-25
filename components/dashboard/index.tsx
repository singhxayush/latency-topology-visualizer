"use client";

import {useAtom} from "jotai";
import dynamic from "next/dynamic";
import {dashboardViewAtom} from "@/atoms/dashboardAtoms";

const ThreeGlobe = dynamic(() => import("@/components/dashboard/globe"), {
  ssr: false,
  loading: () => (
    <div className="text-zinc-800 dark:text-white min-h-[calc(100vh-82px)] flex items-center justify-center z-20">
      Loading Globe
    </div>
  ),
});

const LatencyHistorySimulation = dynamic(
  () => import("@/components/dashboard/analytics"),
  {
    ssr: false,
    loading: () => (
      <div className="text-zinc-800 dark:text-white min-h-[calc(100vh-82px)] flex items-center justify-center z-20">
        Loading Graph
      </div>
    ),
  }
);

const Dashboard = () => {
  const [view] = useAtom(dashboardViewAtom);

  return (
    <div>
      {view === "globe" ? <ThreeGlobe /> : <LatencyHistorySimulation />}
    </div>
  );
};

export default Dashboard;
