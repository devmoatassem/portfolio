import { cn } from '@/utilities/ui'
import React from 'react'
interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props

  return (
    <p className={cn('font-logo z-50 text-xl md:text-2xl lg:text-3xl translate-y-2 text-primary', className)}>
      &lt;<span id="abcd">Moatassem Billah</span>/&gt;
    </p>
  )
}
