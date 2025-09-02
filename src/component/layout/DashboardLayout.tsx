"use client"

import type React from "react"

import Header from "./Header"
import { AppSidebar } from "./Sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

type LayoutProps = {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1  w-full">
          <Header />
          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default DashboardLayout
