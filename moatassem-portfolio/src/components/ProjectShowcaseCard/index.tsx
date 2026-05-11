'use client'

import { AppLink as Link } from '@/components/AppLink'
import { Media } from '@/components/Media'
import type { Project } from '@/payload-types'
import { cn } from '@/utilities/ui'
import React from 'react'

const SHOWCASE_LAYOUT_COUNT = 5

const transitionImage =
  'transition-[filter,transform] duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)]'

export const ProjectShowcaseCard: React.FC<{
  className?: string
  data: Omit<Project, 'content' | 'createdAt' | 'updatedAt'>
  index: number
}> = (props) => {
  const { className, data, index } = props
  const { slug, title, technologies, description, heroImage } = data || {}
  const href = `/projects/${slug}`

  const layout = index % SHOWCASE_LAYOUT_COUNT
  const hasTechnologies = technologies && Array.isArray(technologies) && technologies.length > 0
  const sanitizedDescription = description?.replace(/\s/g, ' ')

  const gridClass =
    layout === 0
      ? 'md:col-span-8'
      : layout === 1
        ? 'md:col-span-4 md:mt-24'
        : layout === 2
          ? 'md:col-span-5'
          : layout === 3
            ? 'md:col-span-7'
            : 'md:col-span-12'

  const aspectWrapClass =
    layout === 0
      ? 'aspect-[16/9]'
      : layout === 1
        ? 'aspect-[4/5]'
        : layout === 2
          ? 'aspect-[4/3]'
          : layout === 3
            ? 'aspect-[16/9]'
            : 'min-h-[240px] h-[260px] md:h-[400px]'

  const titleClass =
    layout === 0
      ? 'text-3xl md:text-[2.25rem] md:leading-[2.75rem] font-bold tracking-tight text-foreground mb-2'
      : 'text-xl md:text-2xl md:leading-8 font-semibold tracking-tight text-foreground mb-2'

  const tagChipClass =
    'bg-muted text-muted-foreground font-mono text-xs font-medium uppercase tracking-wide px-3 py-1'

  const renderTags = () => {
    if (!hasTechnologies) return null
    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies!.map((category, idx) => {
          if (typeof category === 'object' && category && 'title' in category) {
            const label = category.title || 'Untitled'
            return (
              <span key={`${label}-${idx}`} className={tagChipClass}>
                {label}
              </span>
            )
          }
          return null
        })}
      </div>
    )
  }

  const imageBlock = (
    <div
      className={cn(
        'overflow-hidden bg-muted mb-6 relative w-full',
        aspectWrapClass,
        'project-showcase-image-wrap',
      )}
    >
      {!heroImage && <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">No image</div>}
      {heroImage && typeof heroImage !== 'string' && (
        <Media
          resource={heroImage}
          htmlElement="div"
          className="absolute inset-0 h-full w-full"
          fill
          imgClassName={cn(
            'object-cover h-full w-full grayscale scale-100',
            'group-hover/project-showcase:grayscale-0 group-hover/project-showcase:scale-105',
            transitionImage,
          )}
        />
      )}
    </div>
  )

  const titleBlock = <h3 className={titleClass}>{title}</h3>

  const descriptionBlock =
    sanitizedDescription ? (
      <p className="text-base leading-6 text-muted-foreground max-w-xl">{sanitizedDescription}</p>
    ) : null

  return (
    <article
      className={cn(
        'group/project-showcase relative project-showcase-card',
        gridClass,
        className,
      )}
    >
      <Link href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">
        {imageBlock}
        {layout === 4 ? (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              {renderTags()}
              {titleBlock}
            </div>
            {sanitizedDescription && (
              <p className="text-base leading-6 text-muted-foreground max-w-md">{sanitizedDescription}</p>
            )}
          </div>
        ) : (
          <>
            {renderTags()}
            {titleBlock}
            {descriptionBlock}
          </>
        )}
      </Link>
    </article>
  )
}
