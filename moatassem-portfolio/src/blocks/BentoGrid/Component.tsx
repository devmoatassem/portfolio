import { cn } from '@/utilities/ui'
import React from 'react'
import {RichText} from '@/components/RichText'
import type { BentoGrid as BentoBlockProps } from '@/payload-types'
import { HeaderLink } from '@/components/HeaderLink'
import {
  getDynamicGridClasses,
  SectionCard,
  SectionDescription,
  SectionTitle,
} from '@/components/ui/section-with-bento-grid'
import { RenderComponents } from '../RenderComponents'

export const BentoGridBlock: React.FC<BentoBlockProps> = (props) => {
  const { columns, richText } = props

  const headerLink = props?.link
  const allColSpans = columns?.map((feature) => feature.size) || []
  return (
    <div className="container py-16">
      {props?.enableHeader && <HeaderLink {...headerLink} />}
      {richText && <RichText data={richText} enableGutter={false} />}
      <div className="grid grid-cols-1 md:grid-cols-12 mt-12 md:border dark:border-neutral-800">
        {(columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { size, title, description } = col
            const { borderClasses, hoverClasses } = getDynamicGridClasses(index, allColSpans)
            return (
              <SectionCard
                className={cn(
                  `col-span-1 ${size} relative group ${borderClasses} dark:border-neutral-800`,
                )}
                key={index}
              >
                <div className={hoverClasses} />
                <div className="relative z-10">
                  <SectionTitle>{title}</SectionTitle>
                  {description && <SectionDescription>{description}</SectionDescription>}
                  {/* <LocationCard/> */}
                  <RenderComponents column={col} />
                </div>
              </SectionCard>
            )
          })) ||
          []}
      </div>
    </div>
  )
}
