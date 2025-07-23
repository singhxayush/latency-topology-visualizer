"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuItem,
} from "../ui/sidebar";

const AppSidebar = () => {

  return (
    <Sidebar
      side="right"
      collapsible="offcanvas"
      className="border-0 border-transparent bg-transparent transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
    >
      <SidebarContent className="px-4 py-2 bg-white border border-zinc-200 dark:border-zinc-800 shadow dark:bg-neutral-950 my-4 mt-15 rounded-l-2xl">
        <SidebarGroup className="px-0">
          <SidebarGroupLabel className="text-zinc-400 text-xs font-medium">
            Analytics
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuItem>a</SidebarMenuItem>
            <SidebarMenuItem>b</SidebarMenuItem>
            <SidebarMenuItem>c</SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
