import type { ArchiveBlock as ArchiveBlockProps } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { CollectionArchive } from '@/components/CollectionArchive'
import { HeroParallax } from '@/components/ui/hero-parallax'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    relationTo,
    type,
  } = props

  const limit = limitFromProps || 3

  let posts: any[] = []

  if (populateBy === 'collection' && relationTo) {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: relationTo,
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })
    posts = fetchedPosts.docs.map((doc) => ({
      ...doc,
      relationTo,
    }))
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((doc) => {
        if (typeof doc.value === 'object') {
          return {
            ...doc.value,
            relationTo: doc.relationTo,
          }
        }
      }) as any[]

      posts = filteredSelectedPosts
    }
  }

  if (type === 'advanceParallax') {
    return <HeroParallax posts={posts} introContent={introContent || undefined} />
  }
  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}

      <CollectionArchive posts={posts} />
    </div>
  )
}
