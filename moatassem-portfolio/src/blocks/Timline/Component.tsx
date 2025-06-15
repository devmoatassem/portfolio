import React from 'react'
import { RichText } from '@/components/RichText'
import type { Timline as TimlineBlockProps } from '@/payload-types'
import { HeaderLink } from '@/components/HeaderLink'
import { Timeline } from '@/components/ui/timline'

export const TimlineBlock: React.FC<TimlineBlockProps> = (props) => {
  const { events, richText } = props

  const headerLink = props?.link

  return (
    <div className="container py-16">
      {props?.enableHeader && <HeaderLink {...headerLink} />}
      {richText && <RichText data={richText} enableGutter={false} />}
      <Timeline data={events || []} />
     
    </div>
  )
}
