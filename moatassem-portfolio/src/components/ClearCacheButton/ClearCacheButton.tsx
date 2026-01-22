'use client'
import React from 'react'
import { Button, toast } from '@payloadcms/ui'
import { BrushCleaning } from 'lucide-react'

export const ClearCacheButton: React.FC = () => {
  const [loading, setLoading] = React.useState(false)
  const handleClearCache = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/clear-cache', {
        method: 'POST',
      })

      if (response.ok) {
        toast.success('Cache cleared successfully!')
        setLoading(false)
      } else {
        toast.error('Failed to clear cache')
        setLoading(false)
      }
    } catch (error) {
      toast.error((error as Error)?.message || 'Error clearing cache')
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '1rem' }}>
      <Button onClick={handleClearCache} disabled={loading}>
        Clear Frontend Cache <BrushCleaning size={14} />
      </Button>
    </div>
  )
}
