"use client"
import { Button } from '@/components/ui/button'
import { Skeleton } from "@/components/ui/skeleton"
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {SidebarTrigger} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function AppHeader({hideSideBar = false, showBtn = false, setCollapse}) {
  const { isLoaded } = useUser();
  const { setTheme } = useTheme()
    
  
 
  
    
  return (
    <div className={` ${hideSideBar ? 'flex justify-end  border-b items-center   p-3 gap-5 shadow' : 'flex  justify-between sticky top-0 items-center  border-b p-3 gap-5 shadow'}`}>
       {!hideSideBar && <div className='lg:invisible visible '><SidebarTrigger onClick={()=> setCollapse(prev => !prev)} /></div>}
   
    
    <div className="flex items-center gap-5">
        {hideSideBar 
        ? <Link className=' ' href={'/workspace'}><Button variant={'outline'}>Back</Button></Link> 
        : (
          <>
            {!isLoaded ? (
              <Skeleton className="h-8 w-8 rounded-full animate-spin" />
            ) : (
              <UserButton  />
            )}
          </>
        )
      }  
      
      <div className="">
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        
      </DropdownMenuContent>
    </DropdownMenu>
      </div>
    </div>
    
      
    </div>
  )
}

export default AppHeader;