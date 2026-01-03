import type { Metadata } from 'next/types'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'
import { ProjectCard } from '@/components/ProjectCard'
import { cn } from '@/utilities/ui'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const projects = await payload.find({
    collection: 'projects',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
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
          collection="projects"
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

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Projects Page ${pageNumber || ''} | Moatassem`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
