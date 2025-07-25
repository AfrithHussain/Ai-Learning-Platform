"use client";
import React from "react";
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
  PencilRuler,
  ReceiptIndianRupee,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function WorkSpace() {
  const navLinks = [
    {
      title: "Dashboard",
      icons: LayoutDashboard,
      path: "/workspace",
    },
    {
      title: "My Learning",
      icons: LucidePanelRightOpen,
      path: "/workspace/my-learning",
    },
    {
      title: "Explore Courses",
      icons: Book,
      path: "/workspace/courses",
    },
    {
      title: "AI Tools",
      icons: PencilRuler,
      path: "/workspace/ai-tools",
    },
    {
      title: "Billing",
      icons: ReceiptIndianRupee,
      path: "/workspace/billing",
    },
    {
      title: "Profile",
      icons: CircleUserRound,
      path: "/workspace/profile",
    },
  ];

  const path = usePathname();
  return (
    <div>
      <Sidebar>
        <SidebarHeader className={'ml-10 mt-1 '}>
          <Image alt="logo" width={130} height={130} src={"/logo.svg"} />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <Button className={'mt-1'}>Create a Course</Button>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navLinks.map((item, i) => (
                  <Link
                    key={item.title}
                    href={item.path}
                  
                  >
                    <SidebarMenuItem className={"p-2"}>
                      <SidebarMenuButton    className={`hover:bg-neutral-200  ${
                      path?.includes(item.path) && "bg-neutral-200"
                    }`} asChild>
                        <div className="flex items-center gap-2 w-full text-left ">
                          <item.icons />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </Link>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </div>
  );
}

export default WorkSpace;
