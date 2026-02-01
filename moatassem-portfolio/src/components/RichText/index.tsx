import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react'
import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  GridBlockComponent as GridBlcokProps,
  CodeBlock as CodeBlockProps,
} from '@/payload-types'
import { cn } from '@/utilities/ui'
import { useMemo } from 'react'
import React from 'react'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps | GridBlcokProps
    >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  if (!linkNode.fields.doc) return '#'
  const { value, relationTo } = linkNode.fields.doc
  if (typeof value !== 'object' || value === null) return '#'
  const slug = value.slug
  if (typeof slug !== 'string') return '#'
  return relationTo ? `/${relationTo}/${slug}` : `/${slug}`
}

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
  renderBlocks?: boolean
} & React.HTMLAttributes<HTMLDivElement>

// Lazy-loaded block components
const blockComponents = {
  banner: React.lazy(() =>
    import('@/blocks/Banner/Component').then((m) => ({ default: m.BannerBlock })),
  ),
  mediaBlock: React.lazy(() =>
    import('@/blocks/MediaBlock/Component').then((m) => ({ default: m.MediaBlock })),
  ),
  code: React.lazy(() => import('@/blocks/Code/Component').then((m) => ({ default: m.CodeBlock }))),
  cta: React.lazy(() =>
    import('@/blocks/CallToAction/Component').then((m) => ({ default: m.CallToActionBlock })),
  ),
  grid: React.lazy(() =>
    import('@/blocks/Grid/Component').then((m) => ({ default: m.GridBlockComponent })),
  ),
}

export const RichText: React.FC<Props> = (props) => {
  const {
    className,
    enableProse = true,
    enableGutter = true,
    renderBlocks = false,
    ...rest
  } = props

  const converters = useMemo<JSXConvertersFunction<NodeTypes>>(() => {
    return ({ defaultConverters }) => {
      const base = {
        ...defaultConverters,
        ...LinkJSXConverter({ internalDocToHref }),
      }

      if (!renderBlocks) return base

      return {
        ...base,
        blocks: {
          banner: ({ node }) => (
            <React.Suspense fallback={<div className="col-start-2 mb-4" />}>
              <blockComponents.banner className="col-start-2 mb-4" {...node.fields} />
            </React.Suspense>
          ),
          mediaBlock: ({ node }) => (
            <React.Suspense fallback={<div className="col-start-1 col-span-3" />}>
              <blockComponents.mediaBlock
                className="col-start-1 col-span-3 py-0"
                imgClassName="m-0"
                {...node.fields}
                captionClassName="mx-auto max-w-[48rem]"
                enableGutter={false}
                disableInnerContainer={true}
              />
            </React.Suspense>
          ),
          code: ({ node }) => {
            const { language, ...fields } = node.fields
            return (
              <React.Suspense fallback={<div className="col-start-2" />}>
                <blockComponents.code
                  className="col-start-2"
                  {...fields}
                  language={language ?? undefined}
                />
              </React.Suspense>
            )
          },
          cta: ({ node }) => (
            <React.Suspense fallback={<div />}>
              <blockComponents.cta {...node.fields} />
            </React.Suspense>
          ),
          grid: ({ node }) => (
            <React.Suspense fallback={<div />}>
              <blockComponents.grid {...node.fields} />
            </React.Suspense>
          ),
        },
      }
    }
  }, [renderBlocks])

  return (
    <RichTextWithoutBlocks
      converters={converters}
      className={cn(
        {
          'container ': enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert ': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
