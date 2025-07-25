import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from './_components/AppSidebar'


function WorkspaceProvider({children}) {
  return (
    <div>
       <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
    </div>
  )
}

export default WorkspaceProvider