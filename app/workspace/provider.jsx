"use client"
import React from 'react'
import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from './_components/AppSidebar'
import AppHeader from './_components/AppHeader'
import { useState } from 'react'

function WorkspaceProvider({ children }) {
  let [collapse, setCollapse] = useState(false)
  return (
    <SidebarProvider>   {/* Provides sidebar state */}
      <AppSidebar collapse={collapse}  />    {/* The sidebar */}
      <div className='w-full'>
        
        <AppHeader  setCollapse={setCollapse} />   {/* Header with SidebarTrigger */}
        <div className="p-10">
          
          {children}</div>
      </div>
    </SidebarProvider>
  )
}

export default WorkspaceProvider
