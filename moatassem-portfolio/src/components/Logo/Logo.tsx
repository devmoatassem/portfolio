import { cn } from '@/utilities/ui'
import React from 'react'
interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props

  // const loading = loadingFromProps || 'lazy'
  // const priority = priorityFromProps || 'low'

  return (
    <div className={cn('dark:text-white font-logo text-3xl translate-y-2', className)}>
      &lt;<span id="abcd">Moatassem Billah</span>/&gt;
    </div>
  )
}
