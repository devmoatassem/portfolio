import type { ProjectShowcaseBlock as ShowcaseBlockProps } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { RichText } from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { ProjectShowcaseCard } from '@/components/ProjectShowcaseCard'

export const ProjectShowcaseBlock: React.FC<
  ShowcaseBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    showLoadMore,
    loadMoreLink,
  } = props

  const limit = limitFromProps || 10

  let posts: any[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const fetchedPosts = await payload.find({
      collection: 'projects',
      limit,
      select: {
        slug: true,
        title: true,
        heroImage: true,
        technologies: true,
        description: true,
      },
    })
    posts = fetchedPosts.docs.map((doc) => ({
      ...doc,
    }))
  } else if (selectedDocs?.length) {
    const ids = selectedDocs
      .map((doc) => (typeof doc === 'object' ? (doc as any).id : doc))
      .filter(Boolean)

    if (ids.length) {
      const payload = await getPayload({ config: configPromise })
      const fetched = await payload.find({
        collection: 'projects',
        where: { id: { in: ids } },
        limit: ids.length,
        select: {
          slug: true,
          title: true,
          heroImage: true,
          technologies: true,
          description: true,
        },
      })

      const byId = fetched.docs.reduce((acc: Record<string, any>, d: any) => {
        acc[d.id] = d
        return acc
      }, {})

      posts = ids.map((id) => byId[id]).filter(Boolean)
    } else {
      posts = (selectedDocs as any[]).filter(Boolean).map((d) => ({ ...(d as any) }))
    }
  }

  return (
    <section className="py-16 md:py-24" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-12 md:mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <div className={cn('container max-w-[90rem]', !introContent && 'pt-4')}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return <ProjectShowcaseCard data={result as any} key={result.id ?? index} index={index} />
            }
            return null
          })}
        </div>
      </div>
      {showLoadMore && loadMoreLink && (
        <div className="container mt-16 flex justify-center">
          <CMSLink {...loadMoreLink} appearance="outline" />
        </div>
      )}
    </section>
  )
}
