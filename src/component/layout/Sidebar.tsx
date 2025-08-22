"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  ChartPie,
  Paperclip,
  FileText,
  HeartHandshake,
  ChartNoAxesCombined,
  MessageCircle,
  HandHelping,
  Handshake,

} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Image from 'next/image'
export const items = [
  {
    title: "OVERVIEW",
    isSection: true,
    items: [
      {
        title: "Summary",
        url: "/dashboard",
        icon: House,
      },
      {
        title: "Portfolio",
        url: "/dashboard/portfolio",
        icon: ChartPie,
      },
      {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: ChartNoAxesCombined,
      },
    ],
  },
  {
    title: "TRADE CONFIRMATION",
    isSection: true,
    items: [
      {
        title: "Messages",
        url: "/dashboard/messages",
        icon: MessageCircle,
      },
      {
        title: "Attachements",
        url: "/dashboard/attachements",
        icon: Paperclip,
      },
      {
        title: "Trade Confirmations",
        url: "/dashboard/trade",
        icon: Handshake,
      },
      {
        title: "Statements",
        url: "/dashboard/statements",
        icon: FileText,
      },
    ],
  },
  {
    title: "MANAGEMENT",
    isSection: true,
    items: [
      {
        title: "Householding",
        url: "/dashboard/householding",
        icon: HeartHandshake,
      },
      {
        title: "Advisor",
        url: "/dashboard/advisor",
        icon: HandHelping,
      },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname()


  return (
    <Sidebar className="">
      <SidebarHeader className="p-4 pb-2 ">
        <div className="flex items-center gap-2">
          <Image src="/image/logo.svg" alt="One Boss Logo" width={24} height={24} />
          <span className="text-xl font-semibold leading-none">One Boss</span>
        </div>
      </SidebarHeader>

      <SidebarContent >
        {items.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="text-xs font-medium uppercase text-primary-600 dark:text-primary-1000">
              {section.title}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu >
                {section.items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className={`flex items-center rounded-md transition-colors ${isActive
                            ? "bg-primary-1000 text-primary-50 shadow-sm"
                            : "text-primary-1000 dark:text-gray-300 hover:bg-primary-1000 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                            }`}
                        >
                          <item.icon />
                          <span className="body-14-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}


      </SidebarContent>

    </Sidebar >
  );
}
