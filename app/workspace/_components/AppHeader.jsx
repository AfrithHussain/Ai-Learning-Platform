import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function AppHeader() {
  return (
    <div className='flex w-full justify-between p-3 items-center shadow-sm'>
        <SidebarTrigger />
        <UserButton/>
        
    </div>
  )
}

export default AppHeader