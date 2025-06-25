import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, ArchiveCardData } from '@/components/Card'
import { ProductCard } from '../ui/hero-parallax'

export type Props = {
  data: (ArchiveCardData & { relationTo?: string })[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { data } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {data?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <ProductCard
                    // className="h-full"
                    product={result}
                    // showCategories
                  />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
