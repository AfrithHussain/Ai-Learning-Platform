"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
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
} from "lucide-react";
import AddCourseDialogBox from "./AddCourseDialogBox";

function AppSideBar() {
  const path = usePathname();
  const router = useRouter();

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

  // Prefetching logic (can stay as is)
  useEffect(() => {
    navLinks.forEach((link) => {
      router.prefetch(link.path);
    });
  }, [router]);

  return (
    // ✅ 1. Use the `collapsible="icon"` prop.
    // Remove the manual className for width control.
    <Sidebar collapsible="icon" >
      <SidebarHeader>
        {/* The component's CSS will hide the logo when collapsed */}
        <Image alt="logo" width={130} height={40} src="/logo.svg" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {/* This button will also be hidden automatically */}
          <AddCourseDialogBox >
          
            <Button className="mt-1 w-full">Create a Course</Button>
          </AddCourseDialogBox>
        </SidebarGroup>

        <SidebarGroup >
          <SidebarGroupContent >
            <SidebarMenu>
              {navLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {/* ✅ 2. Use the built-in `tooltip` prop. */}
                  {/* The component handles showing it only when collapsed. */}
                  <SidebarMenuButton
 className={'py-4 my-4'}                    asChild
                    isActive={path === item.path}
                    tooltip={item.title}
                  >
                    <Link href={item.path} prefetch>
                      <item.icons className="h-5 w-5" />
                      {/* ✅ 3. Keep the span! The library's CSS will hide it. */}
                      {/* This is the key part. */}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
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