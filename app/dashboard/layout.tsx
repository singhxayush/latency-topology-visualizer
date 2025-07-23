import AppNav from "@/components/layout/AppNav";
import AppSidebar from "@/components/layout/AppSidebar";
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
          <div className="flex-1 overflow-auto scrollbar-thin mt-11 py-4 pr-4 ">{children}</div>
        </main>
        <AppSidebar />
      </div>
    </SidebarProvider>
  );
}
