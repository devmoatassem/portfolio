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
      className={cn(
        'group/product rounded border overflow-hidden h-96 aspect-square relative shrink-0 cursor-pointer',
        className,
      )}
      style={translate ? { x: translate } : undefined}
      ref={card.ref}
      whileHover={{
        y: -20,
      }}
    >
      <Link href={href} className="block group-hover/product:shadow-2xl">
        {!heroImage && <div className="">No image</div>}
        {heroImage && typeof heroImage !== 'string' && (
          <Media
            resource={heroImage}
            imgClassName="object-cover object-left-top absolute h-full w-full inset-0"
          />
        )}
      </Link>
      <div className="text-white rounded-full border border-white p-2 absolute top-1 right-1 z-50 opacity-0 group-hover/product:opacity-100 translate-y-4 group-hover/product:translate-y-0 transition-all duration-300 delay-75">
        <MoveUpRight size={16} className="scale-125" />
      </div>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none transition-opacity duration-300 flex flex-col items-center justify-center px-6">
        <h2 className="text-white text-2xl font-bold mb-4  opacity-0 group-hover/product:opacity-100 translate-y-4 group-hover/product:translate-y-0 transition-all duration-300 delay-75">
          {title}
        </h2>

        {description && (
          <div className="text-white mb-4 opacity-0 group-hover/product:opacity-100 translate-y-4 group-hover/product:translate-y-0 transition-all duration-300 delay-150">
            <p className="line-clamp-2">{sanitizedDescription}</p>
          </div>
        )}

        {hasTechnologies && (
          <div className="uppercase text-white text-sm opacity-0 group-hover/product:opacity-100 translate-y-4 group-hover/product:translate-y-0 transition-all duration-300 delay-200">
            <div>
              {displayTechnologies?.map((category, index) => {
                if (typeof category === 'object') {
                  const { title: titleFromCategory } = category
                  const categoryTitle = titleFromCategory || 'Untitled category'
                  return (
                    <div
                      key={index}
                      className="inline-block border px-2 py-1 mr-2 bg-black/5 backdrop-blur-sm rounded"
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
    </motion.article>
  )
}
