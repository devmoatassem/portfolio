import { cn } from '@/utilities/ui'
import React from 'react'
import type { GridBlockComponent as GridBlcokProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { HeaderLink } from '@/components/HeaderLink'
import { RenderComponents } from '../RenderComponents'
import { RichText } from '@/components/RichText'
import { StacksMarquee } from '@/components/ui/stacks-marquee'

export const GridBlockComponent: React.FC<GridBlcokProps> = (props) => {
  const { columns } = props

  const lgColSpan = {
    full: 'col-span-12',
    half: 'col-span-6',
    oneThird: 'col-span-4',
    twoThirds: 'col-span-8',
    oneFourth: 'col-span-3',
  }
  const headerLink = props?.link
  return (
    <div className="container py-16">
      {props?.enableHeader && <HeaderLink {...headerLink} />}

      <div className="grid grid-cols-12 ">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, size, component } = col

            return (
              <div
                className={cn(
                  size ? lgColSpan[size] : 'col-span-6', // Lookup pre-defined lg column spans with fallback
                )}
                key={index}
              >
                {component === 'marquee' && <StacksMarquee />}
                {/* {richText && <RichText data={richText} enableGutter={false} />} */}
                {/* <RenderComponents column={col} /> */}
                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
