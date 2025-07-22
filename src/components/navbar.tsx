'use client'
import * as Lucide from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from './ui/button'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  if (pathname && pathname.includes('/go/')) return null

  return (
    <div className="w-screen fixed h-14 border-b flex items-center px-4">
      <div className="flex items-center gap-3">
        <Link href="/">
            <Button variant={pathname == '/' ? 'secondary' : 'ghost'} className="justify-start gap-2 w-full hover:scale-105 duration-200 transition-all">
              <Lucide.Home />
            </Button>
          </Link>
        
      </div>
    </div>
  )
}
