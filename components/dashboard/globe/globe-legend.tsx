import {Home, Server} from "lucide-react";
import {getLatencyColor} from "./globe-utils";

const Legend = () => (
  <div className="p-2 md:p-4 flex sm:block items-start justify-between gap-4 bg-white/50 dark:bg-zinc-800/0 backdrop-blur-sm rounded-2xl md:round-br md:bg-transparent space-y-1 text-xs">
    <div className="space-y-2">
      <div className="flex items-center space-x-3">
        <Home className="w-4 h-4 text-cyan-400" />
        <span className="text-neutral-800 dark:text-white">Bot / Trading Server</span>
      </div>
      <div className="flex items-center space-x-3">
        <Server className="w-4 h-4 text-fuchsia-400" />
        <span className="text-neutral-800 dark:text-white">Crypto Exchange</span>
      </div>
    </div>
    
    <div className="space-y-1">
      <h4 className="font-semibold text-neutral-800 dark:text-white">Latency (ms)</h4>
      <div className="flex items-center space-x-2">
        <div
          className="w-2 h-2 rounded-full"
          style={{backgroundColor: getLatencyColor(50)}}
        ></div>
        <span className="text-neutral-800 dark:text-white text-xs">&lt; 100ms (Fast)</span>
      </div>
      <div className="flex items-center space-x-2">
        <div
          className="w-2 h-2 rounded-full"
          style={{backgroundColor: getLatencyColor(125)}}
        ></div>
        <span className="text-neutral-800 dark:text-white text-xs">100-150ms (Avg)</span>
      </div>
      <div className="flex items-center space-x-2">
        <div
          className="w-2 h-2 rounded-full"
          style={{backgroundColor: getLatencyColor(200)}}
        ></div>
        <span className="text-neutral-800 dark:text-white text-xs">&gt; 150ms (Slow)</span>
      </div>
    </div>
  </div>
);

export default Legend;
