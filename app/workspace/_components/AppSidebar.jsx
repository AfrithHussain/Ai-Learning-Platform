"use client";
import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Book,
  CircleUserRound,
  LayoutDashboard,
  LucidePanelRightOpen,
  ReceiptIndianRupee,
  Menu,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import AddCourseDialogBox from "./AddCourseDialogBox";

function AppSideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const path = usePathname();

  const navLinks = [
    { title: "Dashboard", icons: LayoutDashboard, path: "/workspace" },
    { title: "My Learning", icons: LucidePanelRightOpen, path: "/workspace/my-learning" },
    { title: "Explore Courses", icons: Book, path: "/workspace/explore-courses" },
    { title: "Billing", icons: ReceiptIndianRupee, path: "/workspace/billing" },
    { title: "Profile", icons: CircleUserRound, path: "/workspace/profile" },
  ];

  return (
    <Sidebar className={`transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
      
      {/* Sidebar Header with Flex */}
      <SidebarHeader className="flex items-center justify-between p-2">
        <div className="flex items-center gap-14">
          {!collapsed && <Image alt="logo" width={130} height={40} src="/logo.svg" />}
        

        {/* Collapse/Expand Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        </div>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        {/* Add Course Button */}
        <SidebarGroup>
          {!collapsed && (
            <AddCourseDialogBox>
              <Button className="mt-1 w-full">Create a Course</Button>
            </AddCourseDialogBox>
          )}
        </SidebarGroup>

        {/* Navigation Links */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks.map((item) => (
                <SidebarMenuItem key={item.title} className="p-1">
                  <Link href={item.path}>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton
                            className={`flex items-center gap-2 w-full px-2 py-1 rounded hover:bg-neutral-200 ${
                              path === item.path ? "bg-neutral-200" : ""
                            }`}
                            asChild
                          >
                            <div className="flex items-center gap-2">
                              <item.icons className="h-5 w-5" />
                              {!collapsed && <span>{item.title}</span>}
                            </div>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        {collapsed && (
                          <TooltipContent side="right">{item.title}</TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSideBar;
