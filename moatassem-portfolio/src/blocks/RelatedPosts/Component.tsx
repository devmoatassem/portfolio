import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'
import { Card } from '../../components/Card'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export type RelatedPostsProps = {
  className?: string
  docs?: any[]
  introContent?: SerializedEditorState
  relation?: string
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent, relation } = props

  return (
    <div className={clsx('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <Card key={index} doc={doc} showCategories relationTo={relation} />
        })}
      </div>
    </div>
  )
}
