import React, { Fragment } from 'react'
import type { BentoGrid, ContentBlock } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { TextGradientScroll } from '@/components/ui/text-gradient-scroll'
import { GlobeCard } from '@/components/ui/globe-card'
import { StacksMarquee } from '@/components/ui/stacks-marquee'
import { RichText } from '@/components/RichText'

const fieldComponents = {
  richText: RichText,
  media: Media,
  button: CMSLink,
  gradientText: TextGradientScroll,
  globe: GlobeCard,
  marquee: StacksMarquee,
}
type props = {
  column: NonNullable<BentoGrid['columns'] | ContentBlock['columns']>[number]
  renderBlocks?: boolean
}
export const RenderComponents: React.FC<props> = (props) => {
  const { column, renderBlocks } = props
  const { component } = column

  // Check if component type exists in fieldComponents
  if (component && component in fieldComponents) {
    const Component = fieldComponents[component]

    if (Component) {
      // Prepare props based on component type
      const componentProps = getComponentProps(column, renderBlocks)

      return (
        <Fragment>
          {/* @ts-expect-error there may be some mismatch between the expected types here */}
          <Component {...componentProps} />
        </Fragment>
      )
    }
  }

  return null
}

// Helper function to extract the right props for each component type
function getComponentProps(
  column: NonNullable<BentoGrid['columns'] | ContentBlock['columns']>[number],
  renderBlocks?: boolean,
) {
  const baseProps = {
    id: column.id,
  }
  const componentType = column.component
  switch (componentType) {
    case 'richText':
      return {
        ...baseProps,
        data: column.richText,
        enableGutter: false,
        renderBlocks: renderBlocks,
      }

    case 'media':
      return {
        ...baseProps,
        resource: column.media,
      }

    // case 'text':
    //   return {
    //     ...baseProps,
    //     text: column.text,
    //   }

    case 'button':
    // case 'link':
    //   return {
    //     ...baseProps,
    //     ...column.button,
    //   }

    // case 'textarea':
    //   return {
    //     ...baseProps,
    //     content: column.textArea,
    //   }

    case 'gradientText':
      return {
        ...baseProps,
        text: column.gradientText?.text,
        className: column.gradientText?.size,
        textOpacity: 'medium',
      }

    case 'globe':
      return {
        ...baseProps,
        coordinates: column.globe?.coordinates,
        markerSize: column.globe?.markerSize,
      }

    case 'marquee':
      return {
        ...baseProps,
      }

    default:
      return baseProps
  }
}
