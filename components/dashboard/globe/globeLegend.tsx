import {Home, Server} from "lucide-react";
import {getLatencyColor} from "./globeUtils";

const Legend = () => (
  <div className="p-4 bg-transparent backdrop-blur-sm space-y-2 text-xs">
    <div className="space-y-3">
      <div className="flex items-center space-x-3">
        <Home className="w-4 h-4 text-cyan-400" />
        <span className="text-gray-300">Bot / Trading Server</span>
      </div>
      <div className="flex items-center space-x-3">
        <Server className="w-4 h-4 text-fuchsia-400" />
        <span className="text-gray-300">Crypto Exchange</span>
      </div>
    </div>
    <div className="space-y-3 pt-3 border-t border-gray-600">
      <h4 className="font-semibold text-white">Latency (ms)</h4>
      <div className="flex items-center space-x-2">
        <div
          className="w-2 h-2 rounded-full"
          style={{backgroundColor: getLatencyColor(50)}}
        ></div>
        <span className="text-gray-300 text-xs">&lt; 100ms (Fast)</span>
      </div>
      <div className="flex items-center space-x-2">
        <div
          className="w-2 h-2 rounded-full"
          style={{backgroundColor: getLatencyColor(125)}}
        ></div>
        <span className="text-gray-300 text-xs">100-150ms (Avg)</span>
      </div>
      <div className="flex items-center space-x-2">
        <div
          className="w-2 h-2 rounded-full"
          style={{backgroundColor: getLatencyColor(200)}}
        ></div>
        <span className="text-gray-300 text-xs">&gt; 150ms (Slow)</span>
      </div>
    </div>
  </div>
);

export default Legend;
