'use client'
import React from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'motion/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '../RichText'
import { ArchiveCardData } from '../Card'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const HeroParallax = ({
  posts,
  introContent,
}: {
  posts: (ArchiveCardData & { relationTo?: string })[]
  introContent?: SerializedEditorState
}) => {
  const firstRow = posts.slice(0, 5)
  const secondRow = posts.slice(5, 10)
  const thirdRow = posts.slice(10, 15)
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 }

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig)
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig,
  )
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig)
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig)
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig)
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 200]), springConfig)
  const getViewportHeight = () => {
    const baseHeight = 100
    const rowCount = Math.ceil(posts.length / 5)
    return `${Math.max(1, rowCount) * 50 + baseHeight}vh`
  }
  return (
    <div
      ref={ref}
      style={{
        height: `${getViewportHeight()}`,
      }}
      className={cn(
        'pt-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]',
      )}
    >
      {introContent && (
        <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export const ProductCard = ({
  product,
  translate,
}: {
  product: ArchiveCardData & { relationTo?: string }
  translate: MotionValue<number>
}) => {
  const { slug, meta, relationTo, title } = product || {}
  const { image: metaImage } = meta || {}
  const href = `/${relationTo}/${slug}`
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative shrink-0"
    >
      <Link href={href} className="block group-hover/product:shadow-2xl ">
        {/* <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        /> */}
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media
            resource={metaImage}
            imgClassName="object-cover object-left-top absolute h-full w-full inset-0"
          />
        )}
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {title}
      </h2>
    </motion.div>
  )
}
