import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import type { Project } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SlashIcon } from 'lucide-react'

export const ProjectHero: React.FC<{
  post: Project
}> = ({ post }) => {
  const {
    technologies,
    attributes,
    links,
    description,
    heroImage,
    populatedAuthors,
    publishedAt,
    title,
    type,
  } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="relative -mt-[10rem] flex items-end bg-background">
      <div className="container">
        <section className="pt-28 lg:pt-32 pb-0">
          <Breadcrumb className="mb-8 mb:mb-16">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/projects">Projects</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex justify-between  items-start gap-16 mb-10 md:mb-20 flex-col lg:flex-row">
            <div className="flex-1 max-w-3xl w-full ">
              <div
                className="uppercase tracking-widest text-muted-foreground border mb-6 font-semibold w-fit
                px-4 py-2 bg-background3 text-sm md:text-base"
              >
                {type}
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold mb-8 tracking-tight leading-none text-primary ">
                {title}
              </h1>
              <p className="text-base lg:text-xl text-muted-foreground leading-relaxed mb-12 w-full">
                {description}
              </p>
              {technologies && technologies.length > 0 && (
                <div className="">
                  <h2 className=" text-muted-foreground mb-4">Tech Stack</h2>
                  <div className="flex flex-wrap gap-4">
                    {technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-background3 px-4 py-2 rounded border border-border text-sm md:text-base"
                      >
                        {typeof tech === 'string' ? tech : tech.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-8 min-w-[280px] ">
                {attributes?.map((attribute, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                      {attribute.label}
                    </span>
                    <span className="text-base text-primary font-medium">{attribute.value}</span>
                  </div>
                ))}
              </div>
              {links && links.length > 0 && (
                <div className="flex gap-4 ">
                  {(links || []).map(({ link }, i) => {
                    return <CMSLink key={i} size="lg" {...link} />
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
        {heroImage && typeof heroImage !== 'string' && (
          <section className="w-full max-w-7xl mx-auto px-8 ">
            <div className="w-full aspect-video bg-background2 border border-border overflow-hidden relative rounded">
              <Media fill priority imgClassName=" object-cover " resource={heroImage} />
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
