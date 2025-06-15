import { cn } from '@/utilities/ui'
import React from 'react'
import { RichText } from '@/components/RichText'
import type { Timline as TimlineBlockProps } from '@/payload-types'
import { HeaderLink } from '@/components/HeaderLink'
import {
  getDynamicGridClasses,
  SectionCard,
  SectionDescription,
  SectionTitle,
} from '@/components/ui/section-with-bento-grid'
import { RenderComponents } from '../RenderComponents'
import { Timeline } from '@/components/ui/timline'

export const TimlineBlock: React.FC<TimlineBlockProps> = (props) => {
  const { events, richText } = props

  const headerLink = props?.link

  return (
    <div className="container py-16">
      {props?.enableHeader && <HeaderLink {...headerLink} />}
      {richText && <RichText data={richText} enableGutter={false} />}
      <Timeline data={events || []} />
      {/* <div className="grid grid-cols-1 md:grid-cols-12 mt-12 md:border dark:border-neutral-800">
        {(events &&
          events.length > 0 &&
          events.map((event, index) => {
            const { title } = event

            return (
              <SectionCard
                className={cn(`col-span-1 ${size} relative group dark:border-neutral-800`)}
                key={index}
              >
                <div className="relative z-10">
                  <RenderComponents column={col} renderBlocks />
                </div>
              </SectionCard>
            )
          })) ||
          []}
      </div> */}
    </div>
  )
}
