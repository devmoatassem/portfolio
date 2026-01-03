import type { ProjectsArchiveBlock as ArchiveBlockProps } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { RichText } from '@/components/RichText'
import { CollectionArchive } from '@/components/CollectionArchive'
import { HeroParallax } from '@/components/ui/hero-parallax'
import { ProjectsOverlyArchive } from '@/components/ProjectsOverlyArchive'
import { CMSLink } from '@/components/Link'

export const ProjectsArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    type,
    showLoadMore,
    loadMoreLink,
  } = props

  const limit = limitFromProps || 3

  let posts: any[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const fetchedPosts = await payload.find({
      collection: 'projects',
      // depth: 1,
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
  } else {
    if (selectedDocs?.length) {
      const ids = selectedDocs
        .map((doc) => (typeof doc === 'object' ? (doc as any).id : doc))
        .filter(Boolean)

      if (ids.length) {
        const payload = await getPayload({ config: configPromise })
        const fetched = await payload.find({
          collection: 'projects',
          where: { id: { in: ids } },
          // depth: 1, // increase if nested fields need populating
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

        // preserve original order of selectedDocs
        posts = ids.map((id) => byId[id]).filter(Boolean)
      } else {
        posts = (selectedDocs as any[]).filter(Boolean).map((d) => ({ ...(d as any) }))
      }
    }
  }

  if (type === 'advanceParallax') {
    return <HeroParallax posts={posts} introContent={introContent || undefined} />
  }
  if (type === 'rectangularOverlys') {
    return (
      <div className="py-16" id={`block-${id}`}>
        {introContent && (
          <div className="container mb-8">
            <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
          </div>
        )}
        {showLoadMore && loadMoreLink && (
          <div className="container mb-16 ">
            <CMSLink {...loadMoreLink} />
          </div>
        )}
        <ProjectsOverlyArchive data={posts} />
      </div>
    )
  }
  return null
}
