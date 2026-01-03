import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'
import { CallToActionFlow } from '@/components/CallToActionFlow'

export const CallToActionBlock: React.FC<CTABlockProps> = (props) => {
  return (
    <div className="container py-16">
      <CallToActionFlow {...props} />
    </div>
  )
}
