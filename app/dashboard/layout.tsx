import AppNav from "@/components/layout/DashboardNav";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import {SidebarProvider} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="max-h-screen flex w-full bg-white dark:bg-zinc-900">
        <main className="flex-1 flex flex-col overflow-hidden">
          <AppNav />
          <div className="flex-1 overflow-hidden mt-10">{children}</div>
        </main>
        <DashboardSidebar />
      </div>
    </SidebarProvider>
  );
}
