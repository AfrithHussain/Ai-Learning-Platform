"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; // ✅ add useRouter
import Link from "next/link";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import AddCourseDialogBox from "./AddCourseDialogBox";

function AppSideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const path = usePathname();
  const router = useRouter(); // ✅ router for prefetch

  const navLinks = [
    { title: "Dashboard", icons: LayoutDashboard, path: "/workspace" },
    {
      title: "My Learning",
      icons: LucidePanelRightOpen,
      path: "/workspace/my-learning",
    },
    {
      title: "Explore Courses",
      icons: Book,
      path: "/workspace/explore-courses",
    },
    { title: "Billing", icons: ReceiptIndianRupee, path: "/workspace/billing" },
    { title: "Profile", icons: CircleUserRound, path: "/workspace/profile" },
  ];

  // ✅ Prefetch all sidebar routes when sidebar mounts
  useEffect(() => {
    navLinks.forEach((link) => {
      router.prefetch(link.path);
    });
  }, [router]);

  return (
    <Sidebar
      className={`transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}
    >
      {/* Sidebar Header */}
      <SidebarHeader className="flex items-center justify-between p-2">
        <div className="flex items-center gap-14">
          {!collapsed && (
            <Image alt="logo" width={130} height={40} src="/logo.svg" />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setCollapsed(!collapsed);
              // Remove accidental hover/focus state
              document.activeElement?.blur();
            }}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        <SidebarGroup>
          {!collapsed && (
            <AddCourseDialogBox>
              <Button className="mt-1 w-full">Create a Course</Button>
            </AddCourseDialogBox>
          )}
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks.map((item) => (
               <SidebarMenuItem key={item.title} className="p-1">
  <TooltipProvider delayDuration={100}>
    <Tooltip>
      <TooltipTrigger asChild>
        {/* Button handles hover + tooltip */}
        <SidebarMenuButton
          asChild
          className={`
            flex items-center gap-2 w-full px-2 py-1 rounded
            transition-colors
            hover:bg-neutral-200 hover:dark:bg-neutral-800
            ${path === item.path ? "bg-neutral-200 dark:bg-neutral-800" : ""}
            focus:outline-none
          `}
        >
          {/* ✅ Only this part navigates */}
          <Link href={item.path} prefetch>
            <div className="flex items-center gap-2">
              <item.icons className="h-5 w-5" />
              {!collapsed && <span>{item.title}</span>}
            </div>
          </Link>
        </SidebarMenuButton>
      </TooltipTrigger>
      {collapsed && (
        <TooltipContent side="right">{item.title}</TooltipContent>
      )}
    </Tooltip>
  </TooltipProvider>
</SidebarMenuItem>

              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSideBar;
