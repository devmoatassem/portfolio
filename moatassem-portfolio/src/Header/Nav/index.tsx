'use client'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { Menu, SearchIcon } from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // close sheet whenever the route changes
    setOpen(false)
  }, [pathname])
  return (
    <nav className="flex gap-3 items-center relative z-[1000]">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="md:hidden text-primary">
          <Menu />
        </SheetTrigger>
        <SheetContent className='z-[1000]'>
          <SheetHeader>
            <SheetTitle>
              <Link href="/">
                <Logo loading="eager" priority="high" />
              </Link>
            </SheetTitle>

          </SheetHeader>
          <div className="flex flex-col mt-8 divide-y border">
            {navItems.map(({ link }, i) => {
              return <CMSLink key={i} {...link} appearance="ghost" className='mb-0' />
            })}
          </div>
        </SheetContent>
      </Sheet>
      <div className="hidden md:flex gap-3 items-center">
        {navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="link" />
        })}
      </div>

      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}