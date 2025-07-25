import React from 'react'
import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from './_components/AppSidebar'
import AppHeader from './_components/AppHeader'



function WorkspaceProvider({children}) {
  return (
    <div>
       <SidebarProvider>
      <AppSidebar />
      <div className='w-full'>
        
        <AppHeader />
        {children}
      </div>
    </SidebarProvider>
    </div>
  )
}

export default WorkspaceProvider