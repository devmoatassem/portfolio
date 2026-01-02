import { cn } from '@/utilities/ui'
import React from 'react'
import { ArchiveCardData } from '@/components/Card'
import { RectangularOverlyCard } from '../RectangularOverlyCard'

export type Props = {
  data: (ArchiveCardData & { relationTo?: string })[]
}

export const ProjectsOverlyArchive: React.FC<Props> = (props) => {
  const { data } = props

  return (
    <div className={cn('container')}>
      {data?.map((result, index) => {
        if (typeof result === 'object' && result !== null) {
          return (
            <div className="col-span-4" key={index}>
              <RectangularOverlyCard data={result as any} index={index}/>
            </div>
          )
        }
      })}
    </div>
  )
}
