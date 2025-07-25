import React from "react";
import {Clock, TrendingDown, TrendingUp, Zap} from "lucide-react";

type StatsUiProps = {
  stats: {
    min: number;
    max: number;
    avg: number;
  };
};

const StatsUi = ({stats}: StatsUiProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
      <StatCard
        icon={<Zap className="fill-yellow-400" />}
        title="Current Latency"
        value={stats.avg.toString()}
        unit="ms"
        colorClass="text-yellow-400"
      />
      <StatCard
        icon={<Clock />}
        title="Average Latency"
        value={stats.avg.toString()}
        unit="ms"
        colorClass="text-lime-400"
      />
      <StatCard
        icon={<TrendingUp />}
        title="Max Latency"
        value={stats.max.toString()}
        unit="ms"
        colorClass="text-red-400"
      />
      <StatCard
        icon={<TrendingDown />}
        title="Min Latency"
        value={stats.min.toString()}
        unit="ms"
        colorClass="text-green-400"
      />
    </div>
  );
};

export default StatsUi;

const StatCard = ({
  icon,
  title,
  value,
  unit,
  colorClass,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  unit: string;
  colorClass: string;
}) => (
  <div className="bg-neutral-50/50 dark:bg-neutral-950/50 border border-neutral-300 dark:border-neutral-800 p-4 rounded-lg flex items-center space-x-4">
    <div className={`p-2 rounded-full ${colorClass} bg-opacity-20`}>
      {React.cloneElement(icon as React.ReactElement)}
    </div>
    <div>
      <p className="text-sm text-zinc-400">{title}</p>
      <p className="text-xl font-bold text-neutral-600 dark:text-zinc-200">
        {value}
        <span className="text-base font-normal text-zinc-300 ml-1">{unit}</span>
      </p>
    </div>
  </div>
);
