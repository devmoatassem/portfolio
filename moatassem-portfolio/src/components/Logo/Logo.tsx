import React from 'react'
interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <div className="text-white font-logo text-3xl translate-y-2">
      &lt;<span id="abcd">Moatassem Billah</span>/&gt;
    </div>
  )
}
