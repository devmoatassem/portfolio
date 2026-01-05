import type { Metadata } from 'next/types'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { cn } from '@/utilities/ui'
import { ProjectCard } from '@/components/ProjectCard'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const projects = await payload.find({
    collection: 'projects',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      heroImage: true,
      technologies: true,
      type: true,
      description: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Projects</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={projects.page}
          limit={12}
          totalDocs={projects.totalDocs}
        />
      </div>

      <div className={cn('container')}>
        <div>
          <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
            {projects?.docs?.map((project, index) => {
              if (typeof project === 'object' && project !== null) {
                return (
                  <div className="col-span-4" key={index}>
                    <ProjectCard data={project} />
                  </div>
                )
              }

              return null
            })}
          </div>
        </div>
      </div>

      <div className="container">
        {projects.totalPages > 1 && projects.page && (
          <Pagination page={projects.page} totalPages={projects.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Projects | Moatassem`,
  }
}
