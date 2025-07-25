"use client";

import DashboardViewToggle from "@/components/dashboard/DashboardViewToggle";
import {SidebarTrigger, useSidebar} from "@/components/ui/sidebar";
import {ModeToggle} from "@/components/theme-toggle";
import {cn} from "@/lib/utils";

const AppNav = () => {
  const {state} = useSidebar();
  const isSideBarOpen = state === "expanded";

  return (
    <nav className="bg-white dark:bg-gradient-to-b shadow dark:from-neutral-900 m-0 dark:to-neutral-950 absolute top-0 left-0 w-full z-50">
      <div className="flex justify-between md:items-center border-b border border-zinc-200 dark:border-zinc-800 w-full items-center h-12 py-3 gap-4 px-1 md:px-6 sticky top-0">
        {/* <span className="flex gap-2">
          <span>Dashboard /</span>
        </span> */}
          <DashboardViewToggle />

        <span className="flex gap-4 items-center">
          <ModeToggle />
          <SidebarTrigger
            className={cn("hover:bg-black/20", isSideBarOpen && "bg-black/20")}
          />
        </span>
      </div>
    </nav>
  );
};

export default AppNav;
