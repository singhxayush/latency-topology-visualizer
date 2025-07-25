"use client";

import {useAtom} from "jotai";
import {dashboardViewAtom} from "@/atoms/dashboardAtoms";
import {ChevronDown, Globe, TrendingUp} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DashboardViewToggle = () => {
  const [view, setView] = useAtom(dashboardViewAtom);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm p-1 border-none cursor-pointer flex items-center gap-1 justify-center">
          {view === "globe" ? "Globe View" : "Analytics View"}
          <ChevronDown className="size-4.5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => setView("globe")}>
          <Globe className="mr-2 size-4 text-cyan-400" />
          Globe View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setView("analytics")}>
          <TrendingUp className="mr-2 size-4 text-green-400" />
          Analytics View
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu> 
  );
};

export default DashboardViewToggle;
