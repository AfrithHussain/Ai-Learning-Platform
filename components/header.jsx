'use client'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' }
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    



    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])
    const { setTheme } = useTheme()
    return (
        <header>
            <nav data-state={menuState && 'active'} className="fixed z-20 w-full px-2">
                <div
                    className={cn(
                        'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
                        isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5'
                    )}>
                    <div
                        className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link href="https://accounts.mindlyst.xyz/sign-in" aria-label="home" className="flex items-center space-x-2">
                                {/* The component's CSS will hide the logo when collapsed */}
        <Image alt="logo-light" className="block dark:hidden mt-2 mx-auto " width={160} height={45} src="/logo.png" />
         <Image alt="logo-dark" className="hidden dark:block mt-2 mx-auto" width={160} height={45} src="/logo-dark.png" />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu
                                    className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X
                                    className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div
                            className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div
                                className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                              <Link href={'https://accounts.mindlyst.xyz/sign-in'}>
                                   
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className={cn(isScrolled && 'lg:hidden') }>
                                       
          <span className='cursor-pointer'>login</span>
           </Button></Link>
          

        
                               
                               <Link href={'https://accounts.mindlyst.xyz/sign-up'}>
                                   
                                <Button
                                    asChild
                                    
                                    size="sm"
                                    className={cn(isScrolled && 'lg:hidden') }>
                                       
          <span className='cursor-pointer'>Sign up</span>
           </Button></Link>
                                {/* theme */}
                                <div className="">
                                    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={'cursor-pointer'} size="icon">
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
                                 
                                
                                <Link href={'https://accounts.mindlyst.xyz/sign-up'}><Button
                                    asChild
                                   
                                    size="sm"
                                     className={cn(isScrolled ? 'lg:inline-flex ' : 'hidden')}>
                                       
          <span className='cursor-pointer'>Getting Started</span>
           </Button></Link>
          

       
                               
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    
                </div>
            </nav>
        </header>
    );
}
