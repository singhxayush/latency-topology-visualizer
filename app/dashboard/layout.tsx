"use client";

import {dashboardViewAtom} from "@/atoms/dashboardAtoms";
import AppNav from "@/components/layouts/DashboardNav";
import DashboardSidebar from "@/components/layouts/DashboardSidebar";
import {SidebarProvider} from "@/components/ui/sidebar";
import {cn} from "@/lib/utils";
import {useAtom} from "jotai";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dashboardView] = useAtom(dashboardViewAtom);
  const isGlobeView = dashboardView === "globe";
  return (
    <SidebarProvider>
      <div className="max-h-screen flex w-full bg-white dark:bg-zinc-900">
        <main
          className={cn(
            "flex-1 flex flex-col",
            isGlobeView ? "overflow-hidden" : "overflow-auto"
          )}
        >
          <AppNav />
          <div className="flex h-auto mt-[46px] px-1 md:px-4">{children}</div>
        </main>
        <DashboardSidebar />
      </div>
    </SidebarProvider>
  );
}
