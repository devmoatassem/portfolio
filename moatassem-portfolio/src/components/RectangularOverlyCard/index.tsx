'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'
import { motion, MotionValue } from 'motion/react'
import type { Project } from '@/payload-types'
import { Media } from '@/components/Media'
import { MoveUpRight } from 'lucide-react'

export const RectangularOverlyCard: React.FC<{
  className?: string
  data: Omit<Project, 'content' | 'createdAt' | 'updatedAt'>
  translate?: MotionValue<number>
  index: number
}> = (props) => {
  const { card } = useClickableCard({})
  const { className, data, translate } = props
  const { slug, title, technologies, description, heroImage } = data || {}
  const hasTechnologies = technologies && Array.isArray(technologies) && technologies.length > 0
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/projects/${slug}`

  const displayTechnologies = technologies?.slice(0, 3)
  const formattedIndex = String(props.index + 1).padStart(2, '0')
  return (
    <motion.article
      className={cn(
        'group/product overflow-hidden w-full h-fit relative shrink-0 p-4 rounded',
        className,
      )}
      style={translate ? { x: translate } : undefined}
      ref={card.ref}
      initial={{ height: '20rem' }} // h-80 = 20rem
      whileHover={{
        height: '22rem',
        transition: { type: 'spring', stiffness: 300, damping: 25 },
      }}
    >
      <Link href={href} className="block group-hover/product:shadow-2xl cursor-default">
        {!heroImage && <div className="">No image</div>}
        {heroImage && typeof heroImage !== 'string' && (
          <Media
            resource={heroImage}
            imgClassName="object-cover object-left-top absolute h-full w-full inset-0"
          />
        )}
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-75 group-hover/product:opacity-25 bg-black pointer-events-none transition-opacity duration-300 flex flex-col items-center justify-center px-6" />
      <div className="flex items-center justify-center w-full h-full z-50 md:mt-5 md:group-hover/product:mt-3 transition-all duration-200 ease-in-out">
        <div className="grid lg:grid-cols-2 items-center lg:items-start gap-8 h-fit lg:w-[90%] mx-auto relative z-50 ">
          <div className="flex items-start gap-8">
            <span className="text-2xl font-bold text-white">/{formattedIndex}</span>
            <div>
              <h2 className="text-white text-4xl font-bold mb-4">{title}</h2>
              {hasTechnologies && (
                <div className="uppercase text-foreground text-sm">
                  <div>
                    {displayTechnologies?.map((category, index) => {
                      if (typeof category === 'object') {
                        const { title: titleFromCategory } = category
                        const categoryTitle = titleFromCategory || 'Untitled category'
                        return (
                          <div
                            key={index}
                            className="inline-block border px-2 py-1 mr-2 bg-background rounded"
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
          </div>
          <div>
            {sanitizedDescription && (
              <div className="text-white mb-4">
                <p className="line-clamp-2 md:line-clamp-4 lg:line-clamp-none">
                  {sanitizedDescription}
                </p>
              </div>
            )}
            {/* Semi Transparent Button Link to view project */}
            <Link
              href={href}
              className="group-hover/product:shadow-2xl flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/20 px-4 py-2 rounded text-white w-fit z-50 opacity-0 group-hover/product:opacity-100 translate-y-4 group-hover/product:translate-y-0 transition-all duration-300 delay-75"
            >
              View Project <MoveUpRight size={16} className="" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
