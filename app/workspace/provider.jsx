import React from 'react'
import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from './_components/AppSidebar'
import AppHeader from './_components/AppHeader'

function WorkspaceProvider({ children }) {
  return (
    <SidebarProvider>   {/* Provides sidebar state */}
      <AppSidebar />    {/* The sidebar */}
      <div className='w-full'>
        <AppHeader />   {/* Header with SidebarTrigger */}
        <div className="p-10">{children}</div>
      </div>
    </SidebarProvider>
  )
}

export default WorkspaceProvider
