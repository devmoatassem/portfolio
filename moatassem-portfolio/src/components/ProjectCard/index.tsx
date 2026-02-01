'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'
import { motion, MotionValue } from 'motion/react'
import type { Project } from '@/payload-types'
import { Media } from '@/components/Media'
import { MoveUpRight } from 'lucide-react'

export const ProjectCard: React.FC<{
  className?: string
  data: Omit<Project, 'content' | 'createdAt' | 'updatedAt'>
  translate?: MotionValue<number>
}> = (props) => {
  const { card } = useClickableCard({})
  const { className, data, translate } = props
  const { slug, title, technologies, description, heroImage } = data || {}
  const hasTechnologies = technologies && Array.isArray(technologies) && technologies.length > 0
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/projects/${slug}`

  // Limit to 3 categories
  const displayTechnologies = technologies?.slice(0, 3)

  return (
    <motion.article
      className={cn('flex flex-col-reverse gap-3 lg:flex-row w-full items-stretch', className)}
      ref={card.ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
      style={translate ? { y: translate } : undefined}
    >
      <div className="relative w-full lg:w-1/2 flex flex-col items-start justify-between gap-3">
        <div>
          <h2 className="text-primary text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{title}</h2>

          {description && (
            <div className="text-muted-foreground mb-4 ">
              <p className="line-clamp-6">{sanitizedDescription}</p>
            </div>
          )}

          {hasTechnologies && (
            <div className="text-foreground text-sm ">
              <div>
                {displayTechnologies?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category
                    const categoryTitle = titleFromCategory || 'Untitled category'
                    return (
                      <div
                        key={index}
                        className="inline-block border px-2 py-1 mr-2 text-primary bg-background3 rounded"
                      >
                        {categoryTitle}
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            </div>
          )}
        </div>
        <Link
          href={href}
          className="cursor-pointer hover:shadow-2xl flex items-center gap-2 border border-black/20 dark:border-white/20 dark:bg-white/5 bg-black/5 backdrop-blur-sm dark:hover:bg-white/20 hover:bg-black/20 px-4 py-2 rounded text-primary w-fit z-50 duration-300 delay-75"
        >
          View Project <MoveUpRight size={16} className="" />
        </Link>
      </div>
      <div className="relative w-full lg:w-1/2 h-full">
        {!heroImage && <div>No image</div>}
        {heroImage && typeof heroImage !== 'string' && (
          <Media
            resource={heroImage}
            fill
            className="overflow-hidden aspect-[3/2] shadow-lg"
            imgClassName="object-cover rounded-md"
          />
        )}
      </div>
    </motion.article>
  )
}
