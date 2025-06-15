import { cn } from '@/utilities/ui'
import React from 'react'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { CMSLink } from '../../components/Link'
import { HeaderLink } from '@/components/HeaderLink'
import { RenderComponents } from '../RenderComponents'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const lgColSpan = {
    full: 'lg:col-span-12',
    half: 'lg:col-span-6',
    oneThird: 'lg:col-span-4',
    twoThirds: 'lg:col-span-8',
    oneFourth: 'lg:col-span-3',
  }
  const headerLink = props?.link
  return (
    <div className="container py-16">
      {props?.enableHeader && <HeaderLink {...headerLink} />}

      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            return (
              <div
                className={cn(
                  'col-span-4', // Base mobile column span
                  size ? lgColSpan[size] : 'lg:col-span-6', // Lookup pre-defined lg column spans with fallback
                  {
                    'md:col-span-2': size !== 'full', // Medium screen conditional
                  },
                )}
                key={index}
              >
                <RenderComponents column={col} />
                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
