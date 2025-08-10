import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

function AppHeader({hideSideBar=false, showBtn= false}) {
  
  
    
  return (
    <div className='flex w-full justify-between p-3 items-center shadow-sm'>
      { !hideSideBar &&  <SidebarTrigger />}
        <UserButton afterSignOutUrl="/"/>
     { showBtn &&  <Link href={'/workspace/my-learning'}> <Button variant={'outline'}>Back</Button></Link>}
        
    </div>
  )
}

export default AppHeader