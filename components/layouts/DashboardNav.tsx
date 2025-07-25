"use client";

import {usePathname} from "next/navigation";
import {Home} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DashboardViewToggle from "@/components/dashboard/DashboardViewToggle";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {ModeToggle} from "@/components/theme-toggle";
import {cn} from "@/lib/utils";
import Link from "next/link";

const AppNav = () => {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <nav className="bg-white dark:bg-gradient-to-b dark:from-neutral-900 dark:to-neutral-950 shadow fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 h-12 px-3 md:px-6">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="flex items-center gap-1">
                  <Home className="size-4" />
                  <span className="hidden md:inline">Home</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {isDashboard && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Right controls */}
        <div className="flex gap-2 items-center">
          <DashboardViewToggle />
          <ModeToggle />
          <SidebarTrigger
            className={cn("size-8 hover:bg-black/10 dark:hover:bg-white/10")}
          />
        </div>
      </div>
    </nav>
  );
};

export default AppNav;
